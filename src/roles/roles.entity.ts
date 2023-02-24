
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Users } from 'src/users/users.entity';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Users, (user) => user.role)
  users: Users[]
}