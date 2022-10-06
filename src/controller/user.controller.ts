import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, ValidationPipe } from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import { User } from "src/entities/users";
import { Comments } from "src/entities/comments";
import { Repository } from "typeorm";

@Controller('/users')
export class UserController{
constructor(
    @InjectRepository(User)private user: Repository<User>,
    @InjectRepository(Comments)private comment: Repository<Comments>
){}

@Post()
async create(
    @Body() body: User): Promise<{data: User}>{
        const userCreated = await this.user.save(body);
        return{data: userCreated};
}

@Get(':id')
async getone(
    @Param('id', ParseIntPipe)id: number):
    Promise<{data:User}>{
        const user = await this.user.findOne({where:{id}});

            if(!user){
                throw new NotFoundException("Usuário não encontrado!");
            }
            
            return{data:user}      

}

@Get()
async getAll(): Promise<{data: User[];}>{
    const listUser = await this.user.find();

    return {data: listUser}
   
}

@Put(':id')
async update(
    @Param('id', ParseIntPipe) id: number, @Body() body:
    User): Promise<{data: User}>{
        const user = await this.user.findOne({where:{id}});
        
        
        if(!user){
            throw new NotFoundException("Pessoa não encontrada!");
        }


        await this.user.update({id}, body);
        return {data: await this.user.findOne({where:{id}})};
    }

    @Delete(':id')
    async delete(
        @Param('id', ParseIntPipe) id:number):
        Promise<{data:string}>{
            const user =await this.user.findOne({where:{id}});
            const comment = await this.comment.findOne({where:{id}})

            if(user.id === comment.id){
                await this.user.delete(id);
                await this.comment.delete(id);
                return{data: "Usuário e comentário deletados!"}
            }

            await this.user.delete(id);
            return {data: "A pessoa e comentário foi deletado!"}
        }


}