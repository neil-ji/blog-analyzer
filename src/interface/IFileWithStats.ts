import { Dirent, Stats } from "fs";

export interface IFileWithStats {
  dirent: Dirent;
  stats: Stats;
  content: string;
}
