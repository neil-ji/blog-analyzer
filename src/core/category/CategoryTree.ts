import { Category } from "./Category";

export class CategoryTree {
  private _root: Category;
  constructor() {
    this._root = new Category("root");
  }

  public get root(): Category {
    return this._root;
  }

  public link(categories: Category[]) {
    let p = this._root;
    let prev: Category | null = null;
    for (let i = 0; i < categories.length; i++, prev = p) {
      if (prev) {
        p.parent = prev;
      }
      p.child = categories[i];
    }
  }
}
