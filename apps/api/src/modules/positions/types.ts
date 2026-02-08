export interface Position {
  id: string;
  marketId: string;
  userId: string;
  side: 'yes' | 'no';
  shares: number;
  avgPrice: number;
  unrealizedPnl: number;
  realizedPnl: number;
  createdAt: Date;
  updatedAt: Date;
}
