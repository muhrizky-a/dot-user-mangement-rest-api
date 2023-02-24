
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Roles } from 'src/roles/roles.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @ManyToOne(() => Roles, (role) => role.users)
  role: Roles
}