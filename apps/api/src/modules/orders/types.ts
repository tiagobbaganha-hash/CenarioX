import { OrderStatus } from './dto';

export interface Order {
  id: string;
  marketId: string;
  userId: string;
  side: 'yes' | 'no';
  type: 'market' | 'limit';
  amount: number;
  shares: number;
  price: number;
  limitPrice?: number;
  status: OrderStatus;
  filledShares: number;
  createdAt: Date;
  updatedAt: Date;
}
