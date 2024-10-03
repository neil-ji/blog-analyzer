export interface IPagnation<T> {
  /**
   * 数据
   */
  data: T[];

  /**
   * 页码
   */
  page: number;

  /**
   * 每页数量
   */
  limit: number;

  /**
   * 总页数
   */
  total: number;
}
