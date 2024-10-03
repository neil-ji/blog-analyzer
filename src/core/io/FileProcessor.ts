import { readFile, readdir, stat } from "fs/promises";
import { IFileWithStats } from "../../interface";
import { join } from "path";

export class FileProcessor {
  constructor(private input: string) {}
  private async getFileList(path: string): Promise<Array<IFileWithStats>> {
    const files = await readdir(path, { withFileTypes: true, recursive: true });
    const works = files.map(async (file) => {
      const [content, stats] = await Promise.all([
        readFile(join(path, file.name), "utf-8"),
        stat(join(path, file.name)),
      ]);

      return {
        dirent: file,
        stats,
        content,
      };
    });

    return Promise.all(works);
  }

  public async readAll(
    callback: (file: IFileWithStats) => Promise<void>,
    concurrent?: boolean | undefined
  ): Promise<void> {
    const files = await this.getFileList(this.input);
    // 并发模式
    if (concurrent) {
      Promise.all(
        files.map(async (file) => {
          return callback(file);
        })
      );
      return;
    }
    // 串行模式
    files.reduce((pre, cur) => {
      return pre.then(() => callback(cur));
    }, Promise.resolve());
  }
}
