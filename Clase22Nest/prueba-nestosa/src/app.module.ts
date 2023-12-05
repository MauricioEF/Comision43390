import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';


@Module({
  imports: [UsersModule, ConfigModule.forRoot(), MongooseModule.forRootAsync({
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory:async(config:ConfigService)=>({
      uri: config.get<string>('MONGO_URL')
    })
  })],//Me permitirá tener contexto de otros módulos.
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}