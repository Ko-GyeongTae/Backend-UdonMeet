import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from 'src/public/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from 'src/public/entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Room])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
