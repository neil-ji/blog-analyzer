export const getWords = (input: string) => {
  // 匹配汉字、英文单词和数字
  const words = input.match(/[\u4e00-\u9fa5]|[a-zA-Z]+|\d+/g);
  return words ? words.length : 0;
};
