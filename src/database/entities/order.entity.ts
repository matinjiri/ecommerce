import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { UserAddress } from './user_address.entity';

@Entity('shop_orders')
export class ShopOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => UserAddress, (userAddress) => userAddress.id)
  @JoinColumn({ name: 'user_address_id' })
  userAddress: UserAddress;

  @Column({ name: "order_total", type: 'decimal' })
  orderTotal: number;

  @Column({ name: "order_status", type: 'varchar' })
  orderStatus: string;

  @CreateDateColumn()
  date: Date;
}
