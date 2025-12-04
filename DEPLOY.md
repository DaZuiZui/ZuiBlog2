# ZuiBlog-v2 部署指南

## 项目结构

```
ZuiBlog-v2/
├── index.html                          # 首页
├── demo/
│   └── technology/
│       ├── list/
│       │   └── index.html             # 技术文章列表页
│       └── context/
│           └── index.html             # 文章阅读页
└── blog/
    └── technology/
        └── *.md                       # 技术文章（Markdown文件）
```

## GitHub Pages 部署

### 1. 仓库设置

- 确保你的GitHub仓库是 `ZuiBlog2`
- 在仓库Settings中启用GitHub Pages
- 选择分支为 `main`，目录为 `/root`

### 2. 访问地址

- **首页**：https://dazuizui.github.io/ZuiBlog2/
- **文章列表**：https://dazuizui.github.io/ZuiBlog2/demo/technology/list/index.html
- **文章阅读**：https://dazuizui.github.io/ZuiBlog2/demo/technology/context/index.html?file=文件名&title=标题

### 3. 工作流程

1. 访问文章列表页面，自动从GitHub API获取 `blog/technology/` 下的所有 `.md` 文件
2. 点击任何文章，跳转到文章阅读页面
3. 阅读页面使用 `marked.js` 将Markdown转换为HTML并渲染
4. 代码块使用 `highlight.js` 进行语法高亮

### 4. 依赖库

- **marked.js**：Markdown解析库 - https://cdn.jsdelivr.net/npm/marked/marked.min.js
- **highlight.js**：代码高亮库 - https://cdn.jsdelivr.net/npm/highlight.js@11.8.0/

### 5. GitHub API 限制

- 无认证请求：60次/小时
- 有认证请求：5000次/小时

如果遇到API速率限制，可以在浏览器中添加GitHub Token（需要在fetch请求中添加Authorization头）

### 6. 文章添加方法

1. 在 `blog/technology/` 目录下添加新的 `.md` 文件
2. Push到GitHub仓库
3. 刷新文章列表页面，新文章会自动显示
4. 文章按创建时间自动排序，最新的显示在最上面

## 本地测试

如果要在本地测试，建议使用简单的HTTP服务器：

```bash
# 使用Python
python -m http.server 8000

# 或使用Node.js
npx http-server

# 然后访问：http://localhost:8000/
```

## 注意事项

- 所有路径都使用相对路径，确保在任何环境下都能工作
- Markdown文件必须在 `blog/technology/` 目录下
- 支持简体中文和英文混合内容
- 自动计算文章阅读时间
