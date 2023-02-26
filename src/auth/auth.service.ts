import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { verify } from 'argon2';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne({
            where: { username },
        });
        if (user) {
            const isPasswordMatch = await verify(user.password, password);
            if (!isPasswordMatch) throw new UnauthorizedException();

            const { id, name, phone } = user;
            return { id, name, phone };
        } else {
            throw new NotFoundException("User Not Found");
        }
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
