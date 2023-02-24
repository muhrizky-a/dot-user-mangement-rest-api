import { Controller, Param, Body, Post, Get, Put, Delete, Res, HttpStatus, UseFilters } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Response } from 'express';
import { RolesService } from 'src/roles/roles.service';
import { UsersService } from 'src/users/users.service';
import { Users } from './users.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService, private readonly rolesService: RolesService) { }

  @Post()
  async create(@Body() data: Users, @Res() res: Response) {
    const {
      name,
      phone,
      username,
      password
    } = data;

    const hashedPassword = await this.userService.createHashedPassword(password);

    const newUser = await this.userService.create({
      name,
      phone,
      username,
      password: hashedPassword
    });

    res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      message: "User added succesfully",
      data: { id: newUser.id }
    });
  }

  @Get()
  async findAll(@Res() res: Response) {
    const allUsers = await this.userService.findAll();

    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: this.userService.mapDBToUserData(allUsers)
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const user = await this.userService.findOne({
      where: { id: parseInt(id) },
      relations: {
        role: true,
      }
    });
    if (!user) throw new NotFoundException("User Not Found");

    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        name: user.name,
        phone: user.phone,
        username: user.username,
        role: user.role,
      }
    });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Object, @Res() res: Response) {
    const user = await this.userService.findOne({
      where: { id: parseInt(id) },
    });
    if (!user) throw new NotFoundException("User Not Found");

    await this.userService.update(user, data);
    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: "User has been updated"
    });
  }

  @Put(':id/role')
  async updateRole(@Param('id') id: string, @Body() data: Object, @Res() res: Response) {
    const user = await this.userService.findOne({
      where: { id: parseInt(id) },
    });
    if (!user) throw new NotFoundException("User Not Found");

    const roleId = data["roleId"];
    const role = await this.rolesService.findOne({
      where: { id: parseInt(roleId) },
    });
    if (!role) throw new NotFoundException("Role Not Found");

    await this.userService.updateRole(user, role);
    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: "User has been updated"
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    const user = await this.userService.findOne({
      where: { id: parseInt(id) },
    });
    if (!user) throw new NotFoundException("User Not Found");

    await this.userService.remove(user);
    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: "User has been deleted"
    });
  }
}
