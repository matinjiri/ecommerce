import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('user_addresses')
export class UserAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar'})
  address: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}