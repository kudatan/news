import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class CategorySeed {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}

    async run() {
        const categories = [];
        await this.categoryRepository.query('TRUNCATE TABLE "category" CASCADE');
        for (let i = 0; i < 5; i++) {
            const category = this.categoryRepository.create({
                name: faker.commerce.department(),
            });
            categories.push(category);
        }
        await this.categoryRepository.save(categories);
    }
}
