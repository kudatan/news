import { Controller, Get, Param, Query } from '@nestjs/common';
import { ArticleService } from '../services/article.service';

@Controller('articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

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
