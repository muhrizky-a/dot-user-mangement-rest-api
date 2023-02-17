import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({

  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
  // Testing a middleware
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(logger)
  //     .forRoutes({ path: 'users', method: RequestMethod.POST });
  //   consumer
  //     .apply(check)
  //     .forRoutes(
  //       { path: 'users', method: RequestMethod.GET },
  //       { path: 'users/*', method: RequestMethod.GET }
  //     );
  //   consumer
  //     .apply(heyz)
  //     .forRoutes(
  //       { path: 'users/*', method: RequestMethod.GET }
  //     );
  // }
}
