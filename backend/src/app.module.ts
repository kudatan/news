import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Category} from "./entities/category.entity";
import {Article} from "./entities/article.entity";
import {ArticleService} from "./services/article.service";
import {CategoryService} from "./services/category.service";
import {ArticleController} from "./controllers/article.controller";
import {CategoryController} from "./controllers/category.controller";
import {SeederModule} from "./seeders/seeder.module";

@Module({
  imports: [TypeOrmModule.forFeature([Category, Article]), SeederModule],
  controllers: [AppController, ArticleController, CategoryController],
  providers: [AppService, ArticleService, CategoryService],
})
export class AppModule {}
