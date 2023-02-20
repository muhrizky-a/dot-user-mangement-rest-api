import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { hash, argon2id } from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) { }

  async create(payload: Object): Promise<Users> {
    const user = new Users();
    user.name = payload["name"];
    user.phone = payload["phone"];
    user.username = payload["username"];
    user.password = payload["password"];

    const newUser = await this.usersRepository.save(user);
    return newUser;
  }

  async findAll(): Promise<Users[]> {
    const allUsers = await this.usersRepository.find();
    return allUsers;
  }

  async findOne(options): Promise<Users> {
    const user = await this.usersRepository.findOneBy(options);
    return user;
  }

  async update(user: Users, payload: Object): Promise<void> {
    user.name = payload["name"];
    user.phone = payload["phone"];
    await this.usersRepository.save(user);
  }

  async remove(user: Users): Promise<void> {
    await this.usersRepository.delete(user);
  }

  async createHashedPassword(password) {
    const hashedPassword = await hash(
      password,
      {
        type: argon2id,
        raw: false
      }
    );

    return hashedPassword;
  }

  mapDBToUserData(users: Users[]) {
    const data = users.map(user => (
      {
        id: user.id,
        name: user.name
      }
    ));

    return data;
  }
}
