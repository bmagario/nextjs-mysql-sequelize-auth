import { UserController } from './user.controller';
import { UserService } from './user.service';

import { Module } from '@nestjs/common';
import { usersProviders } from './user.provider';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, ...usersProviders],
})
export class UserModule {}
