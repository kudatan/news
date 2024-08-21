import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Article } from './article.entity';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @OneToMany(() => Article, article => article.categoryId)
    articles: Article[];
}
