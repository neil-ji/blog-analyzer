import { Article } from "../..";
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
    let prev: Category | null = null;
    let i = 0;
    while (i < categories.length) {
      categories[i].parent = prev;
      prev && (prev.child = categories[i]);
      prev = categories[i];
      i++;
    }
  }

  /**
   * 层序遍历
   * @param callback 回调函数
   */
  public traverse(callback: (category: Category) => void) {
    const stack: Category[] = [];
    stack.push(this._root);
    while (stack.length) {
      const category = stack.pop()!;
      callback(category);
      stack.push(...category.children);
    }
  }
}
