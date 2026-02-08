export interface PricePoint {
  timestamp: string;
  yesPrice: number;
  noPrice: number;
  volume: number;
}

export interface PriceHistory {
  marketId: string;
  points: PricePoint[];
}
