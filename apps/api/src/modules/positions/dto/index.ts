export class CreatePositionDto {
  marketId: string;
  userId: string;
  side: 'yes' | 'no';
  shares: number;
  avgPrice: number;
}

export class UpdatePositionDto {
  shares?: number;
  avgPrice?: number;
  realizedPnl?: number;
}

export class ClosePositionDto {
  userId: string;
  exitPrice: number;
}
