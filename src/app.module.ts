import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller/user.controller';
import { CommentsController } from './controller/comments.controller';


@Module({
  imports: [ UserModule,TypeOrmModule.forRoot({
    "database": "./ame.sql",
    "type": "sqlite",
    "synchronize": true,
    "entities": ["dist/entities/*.js"]
    
  })],

})
export class AppModule {}
