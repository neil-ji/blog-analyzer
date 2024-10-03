import { Article } from "../article/Article";
import { ICategoryNode } from "../../interface";
import { getId } from "../../util";

export class Category implements ICategoryNode {
  private _id: string;
  private _name: string;
  private _parent: Category | null;
  private _children: Category[];
  private _articles: Article[];
  constructor(rawCategory: string) {
    this._id = getId(rawCategory);
    this._name = rawCategory;
    this._parent = null;
    this._children = [];
    this._articles = [];
  }

  public get articles(): Article[] {
    return this._articles;
  }

  public get children(): Category[] {
    return this._children;
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get parent(): Category | null {
    return this._parent;
  }

  public set article(article: Article) {
    if (this._articles.every(({ id }) => id !== article.id)) {
      this._articles.push(article);
    }
  }

  public set child(category: Category) {
    if (!this._children.some((c) => c.id === category.id)) {
      this._children.push(category);
    }
  }

  public set parent(category: Category) {
    this._parent = category;
  }
}
