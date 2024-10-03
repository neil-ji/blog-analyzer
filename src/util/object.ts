export const pooling = <T>(Constructor: new (...args: any[]) => T) => {
  const pools = new Map<string | number, T>();
  return (key: string | number) =>
    (...args: any[]): T => {
      if (!pools.has(key)) {
        const instance = new Constructor(...args);
        pools.set(key, instance);
      }
      return pools.get(key)!; // 使用非空断言操作符，假设一定存在
    };
};
