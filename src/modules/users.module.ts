import { Module } from "@nestjs/common";
import { UserController } from "src/controller/user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/users";
import { Comments } from "src/entities/comments";
import { CommentsController } from "src/controller/comments.controller";

@Module({
    imports:[ TypeOrmModule.forFeature([User, Comments])],
    controllers: [UserController, CommentsController],
    
})

export class UserModule{}