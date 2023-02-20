import { Controller, Req, Param, Body, Post, Get, Put, Delete, Res, HttpStatus, UseFilters } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) { }

  @Post()
  async create(@Body() data: Object, @Res() res: Response) {
    const newUser = await this.userService.create(data);

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
    const user = await this.userService.findOne({ id: parseInt(id) });
    if (!user) throw new NotFoundException("User Not Found");

    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        name: user.name,
        phone: user.phone,
        username: user.username,
      }
    });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Object, @Res() res: Response) {
    const user = await this.userService.findOne({ id: parseInt(id) });
    if (!user) throw new NotFoundException("User Not Found");

    await this.userService.update(user, data);
    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: "User has been updated"
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    const user = await this.userService.findOne({ id: parseInt(id) });
    if (!user) throw new NotFoundException("User Not Found");

    await this.userService.remove(user);
    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: "User has been deleted"
    });
  }
}
