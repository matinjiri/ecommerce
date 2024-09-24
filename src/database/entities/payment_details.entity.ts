import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { ShopOrder } from './order.entity';

@Entity('payment_details')
export class PaymentDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "transaction_id", type: 'varchar', nullable: true})
  transactionId: string;

  @ManyToOne(() => ShopOrder, (order) => order.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'shop_order_id' })
  order: ShopOrder;

  @Column({ type: 'decimal' })
  amount: number;

  @Column({ type: 'varchar' })
  provider: string; // e.g., "Stripe", "PayPal"

  @Column({ name: "payment_type", type: 'varchar' })
  paymentType: string; // e.g., "Credit Card", "Debit Card"

  @Column({ type: 'varchar' })
  status: string;

  @CreateDateColumn({name: "created_at"})
  createdAt: Date;

  @UpdateDateColumn({name: "updated_at"})
  updatedAt: Date;
}
