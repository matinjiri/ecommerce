import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ShoppingCart } from './shopping_cart.entity';
import { Product } from './product.entity';

@Entity('shopping_cart_items')
export class ShoppingCartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ShoppingCart, (shoppingCart) => shoppingCart.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'shopping_cart_id' })
  shoppingCart: ShoppingCart; // Link to the shopping cart

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: 'product_id' })
  product: Product; // Link to the product being added

  @Column({ type: 'integer', default: 1 })
  quantity: number; // Quantity of the product in the cart
}
