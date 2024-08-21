import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne} from 'typeorm';
import {Category} from './category.entity';

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Category, category => category.articles)
    categoryId: Category;

    @Column()
    title: string;

    @Column({length: 255})
    shortDescription: string;

    @Column('text')
    fullDescription: string;

    @Column({default: 0})
    likes: number;
    
    @Column()
    date: Date;

    @Column()
    image: string;

    @CreateDateColumn()
    createdAt: Date;
}
