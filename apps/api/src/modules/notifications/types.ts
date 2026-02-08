export interface Notification {
  id: string;
  user_id: string;
  type: 'market_resolved' | 'order_filled' | 'position_changed' | 'comment_reply' | 'market_closing';
  title: string;
  message: string;
  link?: string;
  read: boolean;
  created_at: string;
  data?: any;
}
