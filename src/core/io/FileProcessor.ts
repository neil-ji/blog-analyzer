import { readFile, readdir, stat } from "fs/promises";
import { IFileWithStats } from "../../interface";
import { join } from "path";

export class FileProcessor {
  constructor(private input: string) {}
  private async getFileList(path: string): Promise<Array<IFileWithStats>> {
    const filesAndDirs = await readdir(path, {
      withFileTypes: true,
      recursive: true,
    });
    const files = filesAndDirs.filter((file) => file.isFile());
    const works = files.map(async (file) => {
      const filePath = join(file.parentPath, file.name);
      const [content, stats] = await Promise.all([
        readFile(filePath, "utf-8"),
        stat(filePath),
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
  ): Promise<any> {
    const files = await this.getFileList(this.input);
    // 并发模式
    if (concurrent) {
      return Promise.all(
        files.map(async (file) => {
          return callback(file);
        })
      );
    }
    // 串行模式
    files.reduce((pre, cur) => {
      return pre.then(() => callback(cur));
    }, Promise.resolve());
  }
}
