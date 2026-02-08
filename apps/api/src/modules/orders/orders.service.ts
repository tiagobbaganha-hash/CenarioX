import { Injectable, NotFoundException, BadRequestException, Inject, forwardRef } from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto, OrderStatus, OrderType } from './dto';
import { Order } from './types';
import { PositionsService } from '../positions/positions.service';

@Injectable()
export class OrdersService {
  private orders: Order[] = [];
  private idCounter = 1;

  constructor(
    @Inject(forwardRef(() => PositionsService))
    private positionsService: PositionsService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order: Order = {
      id: String(this.idCounter++),
      ...createOrderDto,
      userId: 'demo-user',
      shares: 0,
      price: createOrderDto.type === 'market' ? 0.5 : createOrderDto.limitPrice || 0.5,
      status: OrderStatus.PENDING,
      filledShares: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    order.shares = createOrderDto.amount / order.price;
    this.orders.push(order);

    if (order.type === OrderType.MARKET) {
      await this.matchOrder(order.id);
    }

    return order;
  }

  async findAll(marketId?: string, userId?: string): Promise<Order[]> {
    let filtered = this.orders;
    
    if (marketId) {
      filtered = filtered.filter(o => o.marketId === marketId);
    }
    
    if (userId) {
      filtered = filtered.filter(o => o.userId === userId);
    }

    return filtered;
  }

  async findOne(id: string): Promise<Order> {
    const order = this.orders.find(o => o.id === id);
    if (!order) {
      throw new NotFoundException(`Order ${id} not found`);
    }
    return order;
  }

  async cancel(id: string): Promise<Order> {
    const order = await this.findOne(id);
    
    if (order.status === OrderStatus.FILLED) {
      throw new BadRequestException('Cannot cancel filled order');
    }

    order.status = OrderStatus.CANCELLED;
    order.updatedAt = new Date();
    return order;
  }

  private async matchOrder(orderId: string): Promise<void> {
    const order = await this.findOne(orderId);
    order.status = OrderStatus.FILLED;
    order.filledShares = order.shares;
    order.updatedAt = new Date();

    // Auto-create or update position
    try {
      const existingPositions = await this.positionsService.findAll(order.marketId, order.userId);
      const existingPosition = existingPositions.find(p => p.side === order.side);

      if (existingPosition) {
        // Update existing position (average down/up)
        const totalShares = existingPosition.shares + order.shares;
        const totalCost = (existingPosition.shares * existingPosition.avgPrice) + (order.shares * order.price);
        const newAvgPrice = totalCost / totalShares;

        await this.positionsService.update(existingPosition.id, {
          shares: totalShares,
          avgPrice: newAvgPrice,
        });
      } else {
        // Create new position
        await this.positionsService.create({
          marketId: order.marketId,
          userId: order.userId,
          side: order.side,
          shares: order.shares,
          avgPrice: order.price,
        });
      }
    } catch (error) {
      console.error('Error creating/updating position:', error);
      // Don't fail the order if position creation fails
    }
  }

  async getOrderBook(marketId: string) {
    const orders = await this.findAll(marketId);
    const pending = orders.filter(o => o.status === OrderStatus.PENDING);

    const yesOrders = pending.filter(o => o.side === 'yes').sort((a, b) => (b.limitPrice || 0) - (a.limitPrice || 0));
    const noOrders = pending.filter(o => o.side === 'no').sort((a, b) => (a.limitPrice || 0) - (b.limitPrice || 0));

    return {
      yes: yesOrders.map(o => ({ price: o.limitPrice || o.price, shares: o.shares - o.filledShares })),
      no: noOrders.map(o => ({ price: o.limitPrice || o.price, shares: o.shares - o.filledShares })),
    };
  }

  async getStats(userId?: string) {
    const orders = userId ? await this.findAll(undefined, userId) : this.orders;
    
    const filled = orders.filter(o => o.status === OrderStatus.FILLED);
    const pending = orders.filter(o => o.status === OrderStatus.PENDING);

    return {
      total: orders.length,
      filled: filled.length,
      pending: pending.length,
      cancelled: orders.filter(o => o.status === OrderStatus.CANCELLED).length,
      totalVolume: filled.reduce((sum, o) => sum + o.amount, 0),
    };
  }
}
