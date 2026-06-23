import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('investments')
export class Investment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200 })
  investmentName: string;

  @Column({ length: 100 })
  investmentType: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  investedAmount: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  currentValue: number;

  @Column({ type: 'date' })
  purchaseDate: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.investments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: string;
}
