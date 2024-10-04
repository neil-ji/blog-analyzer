import { Article } from "../article/Article";
import { ICategory } from "../../interface";
import { getId } from "../../util";

export class Category implements ICategory {
  private _id: string;
  private _name: string;
  private _parent: Category | null;
  private _children: Category[];
  private _articles: Article[];
  constructor(name: string) {
    this._id = getId(name);
    this._name = name;
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

  public set child(category: Category | null) {
    if (!category) {
      return;
    }
    if (this._children.every((c) => c.id !== category.id)) {
      this._children.push(category);
    }
  }

  public set parent(category: Category | null) {
    this._parent = category;
  }
}
