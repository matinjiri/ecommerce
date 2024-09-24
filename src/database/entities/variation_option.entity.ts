import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Variation } from './variation.entity';

@Entity('variation_options')
export class VariationOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  value: string;

  @ManyToOne(() => Variation, (variation) => variation.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'variation_id' })
  variation: Variation;
}
