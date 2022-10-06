import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, ValidationPipe } from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import { User } from "src/entities/users";
import { Comments } from "src/entities/comments";
import { Repository } from "typeorm";

@Controller('comments')
export class CommentsController{
    constructor(
        @InjectRepository(User)private user: Repository<User>,
        @InjectRepository(Comments)private comment: Repository<Comments>
    ){}

    @Post()
    async create(
    @Body() body: Comments): Promise<{data: Comments}>{
        const commentsCreated = await this.comment.save(body);
        return{data: commentsCreated};
}

    @Get(':id')
    async getone(
    @Param('id', ParseIntPipe)id: number):
    Promise<{data: Comments}>{
        const comment = await this.comment.findOne({where:{id}});
        const user = await this.user.findOne({where:{id}});

        if(!comment){
            throw new NotFoundException("Comentário não encontrado!");
        }

        return{data:comment}      

}

    @Get()
    async getAll(): Promise<{data: Comments[];}>{
    const listComment = await this.comment.find();
    return {data: listComment}
   
}

    @Put(':id')
    async update(
    @Param('id', ParseIntPipe) id: number, @Body() body:
    Comments): Promise<{data: Comments}>{
        const comment = await this.comment.findOne({where:{id}});
        
        if(!comment){
            throw new NotFoundException("Comentário não encontrado!");
        }

        await this.comment.update({id}, body);
        return {data: await this.comment.findOne({where:{id}})};
    }

    @Delete(':id')
    async delete(
        @Param('id', ParseIntPipe) id:number):
        Promise<{data:string}>{
            
            const comment = await this.comment.findOne({where:{id}});

            await this.comment.delete(id);
            return {data: "O comentário foi deletado!"}
        }

}