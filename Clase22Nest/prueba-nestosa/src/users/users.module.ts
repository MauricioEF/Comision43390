import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './schema/user.schema';

@Module({
  imports: [MongooseModule, MongooseModule.forFeature([
    //Aquí puedo elegir de qué schemas tendrá conocimiento mi módulo de Users
    {
      name:User.name, //Collection
      schema: UserSchema
    }
  ])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
