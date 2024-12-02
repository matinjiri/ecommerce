import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Discount } from './discount.entity';
import { ProductInventory } from './product_inventory.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  desc: string;

  @Column({ type: 'decimal' })
  price: number;

  @ManyToOne(() => Discount, (discount) => discount.id, { nullable: true })
  discount: Discount;

  @ManyToOne(() => ProductInventory, (inventory) => inventory.id, { nullable: true })
  inventory: ProductInventory;

  @CreateDateColumn({name: "created_at"})
  createdAt: Date;

  @UpdateDateColumn({name: "updated_at"})
  updatedAt: Date;

  @DeleteDateColumn({name: "deleted_at", nullable: true})
  deletedAt: Date;
}
