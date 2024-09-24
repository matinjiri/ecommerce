import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from './category.entity';

@Entity('variations')
export class Variation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "variation_type", type: 'varchar' })
  variationType: string;

  @ManyToOne(() => Category, (category) => category.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
