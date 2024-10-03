import { Article } from "./Article";

export class ArticleCollector {
  private _articles: Article[];

  constructor() {
    this._articles = [];
  }

  public collect(article: Article) {
    this._articles.push(article);
  }

  public get articles(): Article[] {
    return this._articles;
  }
}
