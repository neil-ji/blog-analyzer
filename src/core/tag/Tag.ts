import { Article } from "../article/Article";
import { ITag } from "../../interface";
import { getId } from "../../util";

interface ITagConstructorParams {
  name: string;
}

export class Tag implements ITag {
  private _id: string;
  private _name: string;
  private _articles: Article[];

  constructor({ name }: ITagConstructorParams) {
    this._id = getId(name);
    this._name = name;
    this._articles = [];
  }

  public set article(article: Article) {
    if (this._articles.every(({ id }) => id !== article.id)) {
      this._articles.push(article);
    }
  }

  public get articles(): Article[] {
    return this._articles;
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }
}
