import { Tag } from "./Tag";

export class TagSet {
  private _tags: Map<string, Tag>;

  constructor() {
    this._tags = new Map();
  }

  public get tags(): Tag[] {
    return Array.from(this._tags.values());
  }

  public add(tags: Tag[]): void {
    tags.forEach((tag) => {
      if (!this._tags.has(tag.id)) {
        this._tags.set(tag.id, tag);
      }
    });
  }
}
