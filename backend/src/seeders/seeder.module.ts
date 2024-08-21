import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { Article } from '../entities/article.entity';
import { CategorySeed } from './category.seed';
import { ArticleSeed } from './article.seed';
import { DatabaseSeeder } from './database-seeder';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
    imports: [
        TypeOrmModule.forFeature([Category, Article]),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'db',
            port: 5432,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            entities: [Category, Article],
            synchronize: false,
        }),
    ],
    providers: [CategorySeed, ArticleSeed, DatabaseSeeder],
})
export class SeederModule {}
