import { Injectable } from '@nestjs/common';
import { PricePoint, PriceHistory } from './types';

@Injectable()
export class PriceHistoryService {
  private history: Map<string, PricePoint[]> = new Map();

  addSnapshot(marketId: string, yesPrice: number, noPrice: number, volume: number): void {
    if (!this.history.has(marketId)) {
      this.history.set(marketId, []);
    }

    const points = this.history.get(marketId)!;
    points.push({
      timestamp: new Date().toISOString(),
      yesPrice,
      noPrice,
      volume,
    });

    // Manter apenas últimos 1000 pontos
    if (points.length > 1000) {
      points.shift();
    }
  }

  getHistory(marketId: string, limit?: number): PriceHistory {
    const points = this.history.get(marketId) || [];
    const limitedPoints = limit ? points.slice(-limit) : points;

    return {
      marketId,
      points: limitedPoints,
    };
  }

  initializeMarket(marketId: string, yesPrice: number, noPrice: number, volume: number): void {
    if (!this.history.has(marketId)) {
      this.addSnapshot(marketId, yesPrice, noPrice, volume);
    }
  }
}
