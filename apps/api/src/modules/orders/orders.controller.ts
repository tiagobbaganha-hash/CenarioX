import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll(@Query('marketId') marketId?: string, @Query('userId') userId?: string) {
    return this.ordersService.findAll(marketId, userId);
  }

  @Get('stats')
  getStats(@Query('userId') userId?: string) {
    return this.ordersService.getStats(userId);
  }

  @Get('orderbook/:marketId')
  getOrderBook(@Param('marketId') marketId: string) {
    return this.ordersService.getOrderBook(marketId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.findOne(id);
  }

  @Delete(':id')
  cancel(@Param('id') id: string) {
    return this.ordersService.cancel(id);
  }
}
