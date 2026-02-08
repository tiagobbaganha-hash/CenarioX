import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { User } from './user.entity';
import { Market } from './market.entity';

export enum OrderSide {
  YES = 'yes',
  NO = 'no',
}

export enum OrderType {
  MARKET = 'market',
  LIMIT = 'limit',
}

export enum OrderStatus {
  OPEN = 'open',
  PARTIAL = 'partial',
  FILLED = 'filled',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
}

@Entity('orders')
@Index(['user_id', 'status'])
@Index(['market_id', 'side', 'status'])
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @Column('uuid')
  market_id: string;

  @Column({
    type: 'enum',
    enum: OrderSide,
  })
  side: OrderSide;

  @Column({
    type: 'enum',
    enum: OrderType,
  })
  type: OrderType;

  @Column({ type: 'integer' })
  quantity: number;

  @Column({ type: 'integer', default: 0 })
  filled: number;

  @Column({ type: 'decimal', precision: 6, scale: 4 })
  price: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  total_amount: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: '0.00' })
  filled_amount: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.OPEN,
  })
  status: OrderStatus;

  @Column({ type: 'timestamp', nullable: true })
  expires_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Market)
  @JoinColumn({ name: 'market_id' })
  market: Market;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
