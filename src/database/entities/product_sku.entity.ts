import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';
import { VariationOption } from './variation_option.entity';

@Entity('product_skus')
export class ProductSKU {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  sku: string;

  @ManyToOne(() => Product, (product) => product.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => VariationOption, (variationOption) => variationOption.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_variation_id' })
  productVariationOption: VariationOption;
}
