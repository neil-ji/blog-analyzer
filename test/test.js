const { analyze } = require("../dist/index.js");

analyze("./test/posts").then(({ articleCollector, tagSet, categoryTree }) => {
  articleCollector.articles.forEach((article) => {
    console.log("ID", article.id);
    console.log("Title:", article.title);
    console.log(
      "Tags:",
      article.tags.map((tag) => tag.name)
    );
    let category = [];
    let p = article.category;
    while (p) {
      category.push(p.name);
      p = p.parent;
    }
    console.log("Category:", category.reverse().join("/"));
    console.log("Content:", article.content.slice(0, 100));
    console.log("created:", article.created);
    console.log("modified:", article.modified);
    console.log("\n");
  });

  tagSet.tags.forEach((tag) => {
    console.log("Tag:", tag.name);
    console.log(
      "Articles:",
      tag.articles.map((article) => article.title)
    );
    console.log("\n");
  });

  categoryTree.traverse((category) => {
    console.log("Category:", category.name);
    console.log(
      "Articles:",
      category.articles.map((article) => article.title)
    );
    console.log("\n");
  });
});
