import { IArticle } from "./IArticle";

export interface ICategory {
  id: string;
  name: string;
  parent: ICategory | null;
  children: Array<ICategory>;
  articles: Array<IArticle>;
}
