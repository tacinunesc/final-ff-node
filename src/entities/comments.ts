import {
    BaseEntity,
    Entity,
    Column,OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    ManyToOne,
    OneToMany
  } from 'typeorm';
  import { User } from './users';
@Entity('comments')
export class Comments extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 500})
    comentario: string

    @OneToMany(()=> User, (user)=> user.comments)
    user: User[];
}