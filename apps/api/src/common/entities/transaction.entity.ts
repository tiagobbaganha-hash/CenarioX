import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { User } from './user.entity';
import { Market } from './market.entity';
import { OrderSide } from './order.entity';

export enum TransactionType {
  BUY = 'buy',
  SELL = 'sell',
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
  PAYOUT = 'payout',
  REFUND = 'refund',
}

@Entity('transactions')
@Index(['user_id', 'created_at'])
@Index(['market_id', 'created_at'])
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @Column({ type: 'uuid', nullable: true })
  market_id: string;

  @Column({ type: 'uuid', nullable: true })
  order_id: string;

  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  type: TransactionType;

  @Column({
    type: 'enum',
    enum: OrderSide,
    nullable: true,
  })
  side: OrderSide;

  @Column({ type: 'integer', nullable: true })
  quantity: number;

  @Column({ type: 'decimal', precision: 6, scale: 4, nullable: true })
  price: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  fee: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  balance_before: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  balance_after: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Market, (market) => market.transactions, { nullable: true })
  @JoinColumn({ name: 'market_id' })
  market: Market;

  @CreateDateColumn()
  created_at: Date;
}
