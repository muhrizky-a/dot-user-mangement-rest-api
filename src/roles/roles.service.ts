import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from './roles.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>,
  ) { }

  async create(payload: Object): Promise<Roles> {
    const role = new Roles();
    role.name = payload["name"];

    const newRole = await this.rolesRepository.save(role);
    return newRole;
  }

  async findAll(): Promise<Roles[]> {
    const allRoles = await this.rolesRepository.find();
    return allRoles;
  }

  async findOne(options): Promise<Roles> {
    const role = await this.rolesRepository.findOne(options);
    return role;
  }

  async update(role: Roles, payload: Object): Promise<void> {
    role.name = payload["name"];
    await this.rolesRepository.save(role);
  }

  async remove(role: Roles): Promise<void> {
    await this.rolesRepository.delete(role);
  }

  mapDBToRoleData(roles: Roles[]) {
    const data = roles.map(role => (
      {
        id: role.id,
        name: role.name
      }
    ));

    return data;
  }
}
