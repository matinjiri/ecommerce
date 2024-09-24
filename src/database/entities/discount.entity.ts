import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('discounts')
export class Discount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  desc: string;

  @Column({ name: "dicount_percentage", type: 'decimal' })
  discountPercentage: number;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn({name: "created_at"})
  createdAt: Date;

  @UpdateDateColumn({name: "updated_at"})
  updatedAt: Date;

  @DeleteDateColumn({name: "deleted_at", nullable: true})
  deletedAt: Date;
}
