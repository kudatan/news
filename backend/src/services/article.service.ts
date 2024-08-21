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
            where: { categoryId: category },
            take: 10,
            skip: (page - 1) * 10,
            order: { date: 'DESC' },
        });
    }

    async getArticleById(id: number): Promise<Article> {
        return await this.articleRepository.findOne({ where: { id } });
    }
}
