import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [User],
    }),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
