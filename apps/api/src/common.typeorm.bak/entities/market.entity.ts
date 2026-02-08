import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Prediction } from './prediction.entity';

export enum MarketStatus {
  ACTIVE = 'active',
  CLOSED = 'closed',
  RESOLVED = 'resolved',
}

@Entity('markets')
export class Market {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  image: string;

  @Column({ default: 'general' })
  category: string;

  @Column({
    type: 'enum',
    enum: MarketStatus,
    default: MarketStatus.ACTIVE,
  })
  status: MarketStatus;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 50 })
  probability_yes: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total_volume: number;

  @Column({ type: 'timestamp' })
  closes_at: Date;

  @Column({ type: 'boolean', nullable: true })
  resolved_outcome: boolean;

  @OneToMany(() => Prediction, prediction => prediction.market)
  predictions: Prediction[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
