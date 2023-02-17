import { Controller, Req, Param, Body, Post, Get, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { NotFoundError } from 'src/exceptions/NotFoundError';
import { UserService } from 'src/users/user.service';
import { ConfigService } from '@nestjs/config';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private configService: ConfigService) { }

  @Post()
  async create(@Body() user: User): Promise<Object> {
    const newUser = await this.userService.create(user);

    return {
      statusCode: 201,
      message: "User added succesfully",
      data: user
    };
  }

  @Get()
  async findAll(@Res() res: Response) {
    const users = this.userService.findAll();

    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: users,
      name: this.configService.get<string>('DATABASE_USER'),
      namee: process.env.DATABASE_USER
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const users = this.userService.findOne(parseInt(id));
      if (!users) throw new NotFoundError("Not Found");

      res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: users[0]
      });
    } catch (e) {
      res.status(e.statusCode).json({
        statusCode: e.statusCode,
        message: e.message
      });
    }
  }
}
