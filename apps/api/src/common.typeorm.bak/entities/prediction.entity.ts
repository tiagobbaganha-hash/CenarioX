import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Market } from './market.entity';

@Entity('predictions')
export class Prediction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @Column('uuid')
  market_id: string;

  @Column({ type: 'boolean' })
  outcome: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  probability_at_purchase: number;

  @ManyToOne(() => User, user => user.predictions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Market, market => market.predictions)
  @JoinColumn({ name: 'market_id' })
  market: Market;

  @CreateDateColumn()
  created_at: Date;
}
