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

    async findAll(
        page: number = 1,
        limit: number = 10,
        categoryId?: number
    ): Promise<{ data: Article[], total: number }> {

        const query = this.articleRepository.createQueryBuilder('article')
            .leftJoinAndSelect('article.category', 'category')
            .take(limit)
            .skip((page - 1) * limit)
            .orderBy('article.createdAt', 'DESC');

        if (categoryId) {
            query.andWhere('category.id = :categoryId', { categoryId });
        }

        const [result, total] = await query.getManyAndCount();

        return {
            data: result,
            total,
        };
    }
}
