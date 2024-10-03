import { ICategory } from "./ICategory";
import { ITag } from "./ITag";

export interface IFrontmatter {
  [key: string]: string | number | Array<string | number>;
}

export interface IArticle {
  id: string;
  title: string;
  content: string;
  tags?: Array<ITag>;
  category?: ICategory;
  // 从文章中解析出来的创建时间
  created?: Date;
  // 从文章中解析出来的修改时间
  modified?: Date;
}
