import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Index } from 'typeorm';
import { Order } from './order.entity';
import { Position } from './position.entity';
import { Transaction } from './transaction.entity';

export enum MarketStatus {
  ACTIVE = 'active',
  CLOSED = 'closed',
  RESOLVED = 'resolved',
  CANCELLED = 'cancelled',
}

export enum MarketCategory {
  POLITICS = 'politics',
  SPORTS = 'sports',
  CRYPTO = 'crypto',
  ECONOMY = 'economy',
  ENTERTAINMENT = 'entertainment',
  TECHNOLOGY = 'technology',
  OTHER = 'other',
}

@Entity('markets')
@Index(['status', 'category'])
@Index(['closes_at'])
export class Market {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 500 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  image_url: string;

  @Column({
    type: 'enum',
    enum: MarketCategory,
    default: MarketCategory.OTHER,
  })
  category: MarketCategory;

  @Column({
    type: 'enum',
    enum: MarketStatus,
    default: MarketStatus.ACTIVE,
  })
  status: MarketStatus;

  @Column({ type: 'decimal', precision: 6, scale: 4, default: '0.5000' })
  yes_price: number;

  @Column({ type: 'decimal', precision: 6, scale: 4, default: '0.5000' })
  no_price: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: '0.00' })
  total_volume: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: '0.00' })
  liquidity: number;

  @Column({ type: 'integer', default: 0 })
  total_trades: number;

  @Column({ type: 'timestamp' })
  closes_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  resolved_at: Date;

  @Column({ type: 'boolean', nullable: true })
  resolved_outcome: boolean;

  @Column({ type: 'text', nullable: true })
  resolution_notes: string;

  @Column({ type: 'uuid', nullable: true })
  created_by: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @OneToMany(() => Order, order => order.market)
  orders: Order[];

  @OneToMany(() => Position, position => position.market)
  positions: Position[];

  @OneToMany(() => Transaction, transaction => transaction.market)
  transactions: Transaction[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
