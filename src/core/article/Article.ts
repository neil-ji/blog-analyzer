import { IArticle } from "../../interface";
import { Category } from "../category/Category";
import { Tag } from "../tag/Tag";

interface IArticleConstructorParams {
  id: string;
  title: string;
  content: string;
  created: string;
  modified: string;
}

export class Article implements IArticle {
  private _id: string;
  private _title: string;
  private _content: string;
  private _created: Date;
  private _modified: Date;
  private _tags: Array<Tag>;
  private _category: Category | null;

  constructor({
    id,
    content,
    title,
    created,
    modified,
  }: IArticleConstructorParams) {
    this._id = id;
    this._title = title;
    this._content = content;
    this._created = new Date(created);
    this._modified = new Date(modified);
    this._tags = [];
    this._category = null;
  }

  public get id(): string {
    return this._id;
  }

  public get title(): string {
    return this._title;
  }

  public get content(): string {
    return this._content;
  }

  public get created(): Date {
    return this._created;
  }

  public get modified(): Date {
    return this._modified;
  }

  public get tags(): Array<Tag> {
    return this._tags;
  }

  public get category(): Category | null {
    return this._category;
  }

  public set tags(tags: Array<Tag>) {
    const ids = new Set();

    tags.forEach((tag) => {
      if (!ids.has(tag.id)) {
        this._tags.push(tag);
        ids.add(tag.id);
      }
    });
  }

  public set category(category: Category) {
    this._category = category;
  }
}
