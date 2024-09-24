import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: true })
  username: string;

  @Column({ type: 'varchar' })
  role: string;

  @Column({ name: "phone_number", type: 'varchar', unique: true, nullable: true })
  phoneNumber: string;

  @Column({ type: 'varchar', unique: true, nullable: true })
  email: string;

  @CreateDateColumn({name: "created_at"})
  createdAt: Date;

  @UpdateDateColumn({name: "updated_at"})
  updatedAt: Date;

  @DeleteDateColumn({name: "deleted_at", nullable: true})
  deletedAt: Date;
}
