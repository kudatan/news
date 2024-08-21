import { Injectable } from '@nestjs/common';
import { CategorySeed } from './category.seed';
import { ArticleSeed } from './article.seed';

@Injectable()
export class DatabaseSeeder {
    constructor(
        private readonly articleSeed: ArticleSeed,
        private readonly categorySeed: CategorySeed,
    ) {}

    async run() {
        await this.categorySeed.run();
        await this.articleSeed.run();
    }
}
