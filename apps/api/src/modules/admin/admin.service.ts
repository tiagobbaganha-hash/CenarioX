import { Injectable } from '@nestjs/common';
import { MarketsService } from '../markets/markets.service';
import { OrdersService } from '../orders/orders.service';
import { PositionsService } from '../positions/positions.service';

@Injectable()
export class AdminService {
  constructor(
    private marketsService: MarketsService,
    private ordersService: OrdersService,
    private positionsService: PositionsService,
  ) {}

  async getDashboardStats() {
    const marketsStats = await this.marketsService.getStats();
    const ordersStats = await this.ordersService.getStats();
    
    const allPositions = await this.positionsService.findAll();
    const uniqueUsers = new Set(allPositions.map(p => p.userId));
    
    const allMarkets = await this.marketsService.findAll();
    const recentMarkets = allMarkets
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5);
    
    const totalVolume = allMarkets.reduce((sum, m) => sum + (m.total_volume || 0), 0);
    const totalTrades = allMarkets.reduce((sum, m) => sum + (m.total_trades || 0), 0);
    
    const activeUsersCount = uniqueUsers.size;
    
    return {
      totalUsers: uniqueUsers.size,
      activeUsers: activeUsersCount,
      totalMarkets: marketsStats.total || 0,
      activeMarkets: marketsStats.active || 0,
      totalVolume: Math.round(totalVolume * 100) / 100,
      volumeGrowth: 12.5,
      totalDeposits: 0,
      totalWithdrawals: 0,
      avgSessionTime: "24min",
      dailyActiveUsers: activeUsersCount,
      recentActivity: recentMarkets.map(m => ({
        user: "Sistema",
        action: "criou mercado",
        market: m.title,
        time: this.getRelativeTime(m.created_at),
      })),
      topMarkets: allMarkets
        .sort((a, b) => (b.total_volume || 0) - (a.total_volume || 0))
        .slice(0, 5)
        .map(m => ({
          name: m.title,
          volume: "R$ " + ((m.total_volume || 0) * 1000).toLocaleString('pt-BR'),
          trades: m.total_trades || 0,
          change: "+0%",
        })),
    };
  }
  
  private getRelativeTime(dateString: string): string {
    const now = new Date();
    const then = new Date(dateString);
    const diffMs = now.getTime() - then.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return "agora";
    if (diffMins < 60) return "há " + diffMins + " min";
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return "há " + diffHours + "h";
    
    const diffDays = Math.floor(diffHours / 24);
    return "há " + diffDays + "d";
  }
}
