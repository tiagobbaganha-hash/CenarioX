export enum OrderSide {
  YES = 'yes',
  NO = 'no',
}

export enum OrderType {
  MARKET = 'market',
  LIMIT = 'limit',
}

export enum OrderStatus {
  PENDING = 'pending',
  FILLED = 'filled',
  PARTIALLY_FILLED = 'partially_filled',
  CANCELLED = 'cancelled',
}

export class CreateOrderDto {
  marketId: string;
  side: OrderSide;
  type: OrderType;
  amount: number;
  limitPrice?: number;
}

export class UpdateOrderDto {
  status?: OrderStatus;
}
