# blog-analyzer

从 Markdown 格式的博客文章中，分析出文章内容、标题、标签等数据。

# Usage

```ts
import { analyze } from "blog-analyzer";

const input = "your/markdown/files";

async function main() {
  const { articleCollector, categoryTree, tagSet } = await analyze(input);

  // ...
}
```