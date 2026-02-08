export class CreateMarketDto {
  title: string;
  description: string;
  category: string;
  closes_at: string;
}

export class UpdateMarketDto {
  title?: string;
  description?: string;
  status?: string;
  yes_price?: number;
  no_price?: number;
  total_volume?: number;
  liquidity?: number;
  total_trades?: number;
}

export class ResolveMarketDto {
  resolution: 'yes' | 'no' | 'invalid';
}
