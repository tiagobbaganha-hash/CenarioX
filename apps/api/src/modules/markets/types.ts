export interface Market {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  yes_price: number;
  no_price: number;
  total_volume: number;
  liquidity: number;
  total_trades: number;
  closes_at: string;
  created_at: string;
  resolved?: boolean;
  resolution?: 'yes' | 'no' | 'invalid';
  resolved_at?: string;
}
