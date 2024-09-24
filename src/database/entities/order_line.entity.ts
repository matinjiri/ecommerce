import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';
import { ShopOrder } from './order.entity';

@Entity('order_line')
export class OrderLine {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: 'product_id' }) // Specify the column name
  product: Product;

  @ManyToOne(() => ShopOrder, (order) => order.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'shop_order_id' })
  order: ShopOrder;

  @Column({ type: 'integer' })
  quantity: number;

  @Column({ type: 'decimal' })
  price: number;
}
