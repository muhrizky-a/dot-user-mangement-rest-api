import { Module, NotFoundException } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { Users } from './users/users.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'dbuser',
      password: 'secret',
      database: 'usermgmt_db',
      entities: [Users],
      synchronize: true,
    }),
    UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
