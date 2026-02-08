import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePositionDto, UpdatePositionDto } from './dto';
import { Position } from './types';

@Injectable()
export class PositionsService {
  private positions: Position[] = [];
  private idCounter = 1;

  async create(createPositionDto: CreatePositionDto): Promise<Position> {
    const position: Position = {
      id: String(this.idCounter++),
      ...createPositionDto,
      unrealizedPnl: 0,
      realizedPnl: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.positions.push(position);
    return position;
  }

  async findAll(marketId?: string, userId?: string): Promise<Position[]> {
    let filtered = this.positions;
    
    if (marketId) {
      filtered = filtered.filter(p => p.marketId === marketId);
    }
    
    if (userId) {
      filtered = filtered.filter(p => p.userId === userId);
    }

    return filtered;
  }

  async findOne(id: string): Promise<Position> {
    const position = this.positions.find(p => p.id === id);
    if (!position) {
      throw new NotFoundException(`Position ${id} not found`);
    }
    return position;
  }

  async update(id: string, updatePositionDto: UpdatePositionDto): Promise<Position> {
    const position = await this.findOne(id);
    Object.assign(position, updatePositionDto);
    position.updatedAt = new Date();
    return position;
  }

  async updatePnl(id: string, currentPrice: number): Promise<Position> {
    const position = await this.findOne(id);
    const currentValue = position.shares * currentPrice;
    const costBasis = position.shares * position.avgPrice;
    position.unrealizedPnl = currentValue - costBasis;
    position.updatedAt = new Date();
    return position;
  }

  async close(id: string, exitPrice: number): Promise<Position> {
    const position = await this.findOne(id);
    const exitValue = position.shares * exitPrice;
    const costBasis = position.shares * position.avgPrice;
    position.realizedPnl = exitValue - costBasis;
    position.shares = 0;
    position.updatedAt = new Date();
    return position;
  }

  async getPortfolio(userId: string) {
    const positions = await this.findAll(undefined, userId);
    const active = positions.filter(p => p.shares > 0);

    const totalValue = active.reduce((sum, p) => sum + (p.shares * p.avgPrice), 0);
    const totalPnl = active.reduce((sum, p) => sum + p.unrealizedPnl, 0);

    return {
      positions: active,
      summary: {
        totalPositions: active.length,
        totalValue,
        totalPnl,
        totalRealizedPnl: positions.reduce((sum, p) => sum + p.realizedPnl, 0),
      },
    };
  }

  async getMarketPositions(marketId: string) {
    const positions = await this.findAll(marketId);
    const active = positions.filter(p => p.shares > 0);

    const yesShares = active.filter(p => p.side === 'yes').reduce((sum, p) => sum + p.shares, 0);
    const noShares = active.filter(p => p.side === 'no').reduce((sum, p) => sum + p.shares, 0);

    return {
      yes: { shares: yesShares, holders: active.filter(p => p.side === 'yes').length },
      no: { shares: noShares, holders: active.filter(p => p.side === 'no').length },
      total: active.length,
    };
  }

  async getLeaderboard() {
    // Agregar estatísticas por userId
    const userStats = new Map<string, {
      userId: string;
      totalPositions: number;
      activePositions: number;
      totalValue: number;
      realizedPnl: number;
      unrealizedPnl: number;
      totalPnl: number;
      winRate: number;
      totalTrades: number;
    }>();

    this.positions.forEach(position => {
      if (!userStats.has(position.userId)) {
        userStats.set(position.userId, {
          userId: position.userId,
          totalPositions: 0,
          activePositions: 0,
          totalValue: 0,
          realizedPnl: 0,
          unrealizedPnl: 0,
          totalPnl: 0,
          winRate: 0,
          totalTrades: 0,
        });
      }

      const stats = userStats.get(position.userId)!;
      stats.totalPositions++;
      
      if (position.shares > 0) {
        stats.activePositions++;
        stats.totalValue += position.shares * position.avgPrice;
        stats.unrealizedPnl += position.unrealizedPnl;
      }
      
      stats.realizedPnl += position.realizedPnl;
      stats.totalPnl = stats.realizedPnl + stats.unrealizedPnl;
    });

    // Converter para array e ordenar por totalPnl
    const leaderboard = Array.from(userStats.values())
      .sort((a, b) => b.totalPnl - a.totalPnl)
      .map((stats, index) => ({
        rank: index + 1,
        ...stats,
      }));

    return leaderboard;
  }
}
