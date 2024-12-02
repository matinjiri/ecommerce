import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductSKU } from "./product_sku.entity";
import { VariationOption } from "./variation_option.entity";

@Entity('product_variations')
export class ProductVariations {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductSKU, (productSKU) => productSKU.id)
  @JoinColumn({ name: 'product_sku_id' })
  productSKU: ProductSKU;

  @ManyToOne(() => VariationOption, (variationOption) => variationOption.id)
  @JoinColumn({ name: 'variation_option_id' })
  variationOption: VariationOption;
}