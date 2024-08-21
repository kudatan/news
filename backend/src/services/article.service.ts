import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../entities/article.entity';
import {Category} from "../entities/category.entity";

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private articleRepository: Repository<Article>,
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) {}

    async getArticlesByCategory(categoryId: string, page: number): Promise<Article[]> {
        const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
        if (!category) {
            throw new Error('Category not found');
        }
        return await this.articleRepository.find({
            where: { category: category },
            take: 10,
            skip: (page - 1) * 10,
            order: { createdAt: 'DESC' },
        });
    }

    async getArticleById(id: number): Promise<Article> {
        return await this.articleRepository.findOne({ where: { id } });
    }

    async findAll(page: number = 1, limit: number = 10): Promise<{ data: Article[], total: number }> {
        const [result, total] = await this.articleRepository.findAndCount({
            relations: ['category'],
            take: limit,
            skip: (page - 1) * limit,
            order: { createdAt: 'DESC' },
        });

        return {
            data: result,
            total,
        };
    }
}
