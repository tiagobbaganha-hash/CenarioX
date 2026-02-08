import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index, Unique } from 'typeorm';
import { User } from './user.entity';
import { Market } from './market.entity';
import { OrderSide } from './order.entity';

@Entity('positions')
@Unique(['user_id', 'market_id', 'side'])
@Index(['user_id','market_id'])
export class Position {
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

  @Column({ type: 'integer', default: 0 })
  quantity: number;

  @Column({ type: 'decimal', precision: 6, scale: 4 })
  avg_price: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  total_invested: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: '0.00' })
  realized_pnl: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: '0.00' })
  unrealized_pnl: number;

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
