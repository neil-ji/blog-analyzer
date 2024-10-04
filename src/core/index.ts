import path from "path";
import formatFrontmatter from "gray-matter";
import { ArticleCollector } from "./article/ArticleCollector";
import { FileProcessor } from "./io/FileProcessor";
import { Article } from "./article/Article";
import { Category } from "./category/Category";
import { CategoryTree } from "./category/CategoryTree";
import { TagSet } from "./tag/TagSet";
import { Tag } from "./tag/Tag";
import { getId, pooling } from "../util";
import { IFrontmatterKeys } from "../interface";

export const analyze = async (
  input: string,
  frontmatterKeys: IFrontmatterKeys = {
    title: "title",
    tag: "tag",
    category: "category",
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

    // 2. Article 实例化
    const article = new Article({
      id: getId(file.dirent.parentPath + file.dirent.name),
      content,
      title: data[frontmatterKeys.title]
        ? String(data[frontmatterKeys.title])
        : file.dirent.name,
      created: data.created || file.stats.ctime,
      modified: data.modified || file.stats.mtime,
    });

    // 3.1 Tag 实例化，并绑定 Article
    const tags: Tag[] = [];
    data[frontmatterKeys.tag]?.forEach((tag: string) => {
      const _tag = String(tag);
      const tagInstance = createTag(_tag)(_tag);
      tagInstance.article = article;
      tags.push(tagInstance);
    });

    // 3.2 Category 实例化，并绑定 Article
    const categories: Category[] = [categoryTree.root];
    data[frontmatterKeys.category]?.forEach((category: string) => {
      const _category = String(category);
      const categoryInstance = createCategory(_category)(_category);
      categories.push(categoryInstance);
    });
    categories[categories.length - 1].article = article;

    // 4. Article 绑定 Tag、Category
    article.tags = tags;
    article.category = categories[categories.length - 1];

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
