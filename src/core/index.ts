import path from "path";
import formatFrontmatter from "gray-matter";
import { ArticleCollector } from "./article/ArticleCollector";
import { FileProcessor } from "./io/FileProcessor";
import { Article } from "./article/Article";
import { Category } from "./category/Category";
import { CategoryTree } from "./category/CategoryTree";
import { TagSet } from "./tag/TagSet";
import { Tag } from "./tag/Tag";
import { pooling } from "../util";
import { IFrontmatterKeys } from "../interface";

export const analyze = async (
  input: string,
  frontmatterKeys: IFrontmatterKeys = {
    title: "title",
    tag: "tags",
    category: "categories",
  }
) => {
  if (!input || typeof input !== "string") {
    throw new Error("Invalid input path and path must be a string.");
  }

  const createTag = pooling(Tag);
  const createCategory = pooling(Category);
  const inputPath = path.resolve(input);
  const fileProcessor = new FileProcessor(inputPath);
  const categoryTree = new CategoryTree();
  const tagSet = new TagSet();
  const articleCollector = new ArticleCollector();

  await fileProcessor.readAll(async (file) => {
    // 1. 解析 Markdown Frontmatter
    const { data, content } = formatFrontmatter(file.content);

    // 2. 实例化 Article
    const article = new Article({
      content,
      title: data[frontmatterKeys.title],
      created: data.created,
      modified: data.modified,
    });

    // 3. Tag 和 Category 实例化，同时建立与 Article 的关系
    const tags: Tag[] = (data[frontmatterKeys.tag] || []).map((tag: string) => {
      const tagInstance = createTag(tag)({ name: tag });
      tagInstance.article = article;
      return tagInstance;
    });
    const categories: Category[] = (data[frontmatterKeys.category] || []).map(
      (category: string) => {
        const categoryInstance = createCategory(category)({ name: category });
        categoryInstance.article = article;
        return categoryInstance;
      }
    );

    // 4. 建立 Article 与 Tag、Category 的关系
    article.tags = tags;
    article.category = categories[categories.length - 1] || null;

    // TODO：此处 TagSet 与 Tag 池化出现冗余
    // 5. 收集 Article、Tag、Category
    categoryTree.link(categories);
    tagSet.add(tags);
    articleCollector.collect(article);
  }, true);

  return {
    articleCollector,
    categoryTree,
    tagSet,
  };
};
