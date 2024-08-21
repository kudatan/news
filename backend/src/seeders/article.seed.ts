import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../entities/article.entity';
import { Category } from '../entities/category.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class ArticleSeed {
    constructor(
        @InjectRepository(Article)
        private readonly articleRepository: Repository<Article>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}

    async run() {
        const categories = await this.categoryRepository.find();
        await this.articleRepository.clear();

        for (let i = 0; i < 20; i++) {
            const article = this.articleRepository.create({
                title: faker.lorem.sentence(),
                shortDescription: faker.lorem.paragraph(),
                fullDescription: faker.lorem.paragraphs(3),
                likes: faker.datatype.number({ min: 0, max: 2000000 }),
                date: faker.date.past(),
                image: faker.image.imageUrl(),
                categoryId: categories[Math.floor(Math.random() * categories.length)],
            });

            await this.articleRepository.save(article);
        }
    }
}
