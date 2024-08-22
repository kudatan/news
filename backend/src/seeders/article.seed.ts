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

        const imageUrls = [
            'https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat-yawns-displaying-teeth.jpg',
            'https://b1157417.smushcdn.com/1157417/wp-content/uploads/2023/06/happy-samoyed-dog-outdoors-in-summer-field-825x550.jpg?lossy=1&strip=1&webp=0',
            'https://static9.depositphotos.com/1011646/1236/i/450/depositphotos_12369509-stock-photo-breaking-news-screen.jpg',
            'https://cdn.theatlantic.com/thumbor/d8lh_KAZuOgBYslMOP4T0iu9Fks=/0x62:2000x1187/1600x900/media/img/mt/2018/03/AP_325360162607/original.jpg',
            'https://www.wfla.com/wp-content/uploads/sites/71/2023/05/GettyImages-1389862392.jpg?w=2560&h=1440&crop=1',
            'https://www.poochandmutt.co.uk/cdn/shop/articles/02-08-23_BLOG_WHAT_TO_FEED_DOGS_IN_HOT_WEATHER_1.jpg?v=1691498265',
            'https://cdn.royalcanin-weshare-online.io/oCJIPmYBaxEApS7L-QbK/v1/ed3h-how-to-introduce-a-puppy-to-other-pets-hero-dog'
        ];

        for (let i = 0; i < 20; i++) {
            const imageId = faker.datatype.uuid();
            const imageUrl = imageUrls[i % imageUrls.length];
            
            const article = this.articleRepository.create({
                title: faker.lorem.sentence(),
                shortDescription: faker.lorem.paragraph(),
                fullDescription: faker.lorem.paragraphs(5),
                likes: faker.datatype.number({ min: 0, max: 2000000 }),
                image: imageUrl,
                category: categories[Math.floor(Math.random() * categories.length)],
            });

            await this.articleRepository.save(article);
        }
    }
}
