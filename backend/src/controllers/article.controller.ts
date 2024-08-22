import { Controller, Get, Param, Query } from '@nestjs/common';
import { ArticleService } from '../services/article.service';
import {Article} from "../entities/article.entity";

@Controller('articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Get()
    async findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('categoryId') categoryId?: number,
    ): Promise<{ data: Article[], total: number }> {
        return this.articleService.findAll(page, limit, categoryId);
    }
    
    @Get('category/:categoryId')
    async getArticlesByCategory(
        @Param('categoryId') categoryId: string,
        @Query('page') page: number = 1,
    ) {
        return this.articleService.getArticlesByCategory(categoryId, page);
    }

    @Get(':id')
    async getArticleById(@Param('id') id: number) {
        return this.articleService.getArticleById(id);
    }
}
