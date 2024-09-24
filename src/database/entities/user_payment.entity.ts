import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('user_payments')
export class UserPayment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'varchar' })
  provider: string; // e.g., "Stripe", "PayPal"

  @Column({ type: 'varchar' })
  paymentType: string; // e.g., "Credit Card", "Debit Card"

  @Column({ type: 'boolean', default: true })
  active: boolean; // Indicates if the payment method is currently active

  @Column({ name: "account_no", type: 'integer'})
  accountNumber: BigInt;

  @CreateDateColumn({name: "created_at"})
  createdAt: Date;

  @UpdateDateColumn({name: "updated_at"})
  updatedAt: Date;
}
