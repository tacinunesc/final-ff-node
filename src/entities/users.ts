import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
  } from 'typeorm';
  import { Comments } from './comments';

  @Entity('user')
  export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    idade: number;

    @Column()
    cidade: string;

    @ManyToOne(() => Comments)
    comments: Comments
    
   
  }