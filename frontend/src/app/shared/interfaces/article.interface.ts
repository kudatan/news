import {CategoryInterface} from "./category.interface";

export interface ArticleInterface {
  id: number,
  title: string,
  shortDescription: string,
  fullDescription: string,
  likes: number,
  image: string,
  createdAt: Date,
  category: CategoryInterface
}
