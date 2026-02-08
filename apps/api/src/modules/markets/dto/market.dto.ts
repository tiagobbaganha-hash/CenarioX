export class Market {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'open' | 'closed' | 'resolved';
  close_date: Date;
  resolution_date?: Date;
  created_at: Date;
  total_volume: number;
  yes_price: number;
  no_price: number;
}
