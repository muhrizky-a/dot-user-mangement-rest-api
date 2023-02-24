import { Controller, Param, Body, Post, Get, Put, Delete, Res, HttpStatus } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Response } from 'express';
import { Roles } from './roles.entity';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) { }

    @Post()
    async create(@Body() data: Roles, @Res() res: Response) {
        const { name } = data;

        const newRole = await this.rolesService.create({ name });

        res.status(HttpStatus.CREATED).json({
            statusCode: HttpStatus.CREATED,
            message: "Role added succesfully",
            data: { id: newRole.id }
        });
    }

    @Get()
    async findAll(@Res() res: Response) {
        const allRoles = await this.rolesService.findAll();

        res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            data: this.rolesService.mapDBToRoleData(allRoles)
        });
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Res() res: Response) {
        const role = await this.rolesService.findOne({
            where: { id: parseInt(id) },
            relations: {
                users: true,
            }
        });
        if (!role) throw new NotFoundException("Role Not Found");

        res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            data: {
                name: role.name,
                users: role.users.map(user => {
                    return {
                        id: user.id,
                        name: user.name
                    }
                })
            }
        });
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: Object, @Res() res: Response) {
        const role = await this.rolesService.findOne({
            where: { id: parseInt(id) },
        });
        if (!role) throw new NotFoundException("Role Not Found");

        await this.rolesService.update(role, data);
        res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            message: "Role has been updated"
        });
    }

    @Delete(':id')
    async delete(@Param('id') id: string, @Res() res: Response) {
        const role = await this.rolesService.findOne({
            where: { id: parseInt(id) },
        });
        if (!role) throw new NotFoundException("Role Not Found");

        await this.rolesService.remove(role);
        res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            message: "Role has been deleted"
        });
    }
}
