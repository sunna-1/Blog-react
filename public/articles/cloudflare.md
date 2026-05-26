## 构建配置

在 Cloudflare Pages 控制台中:

| 项 | 值 |
|---|---|
| Build command | `npm run build` |
| Output directory | `dist` |
| Root | `/` |

## SPA 路由

React Router 需要让所有路径回退到 `index.html`。在 `public/_redirects` 中:

```
/*    /index.html   200
```

## 推 main 会不会自动上线?

若项目已 **Connect to Git** 且生产分支为 `main`,推送成功并构建通过后,**生产站会更新**。

若仅手动上传 `dist`,则推送 Git 不会自动改线上,需要重新部署。

## 本地验证

```bash
npm run build
npm run preview
```

预览通过后再推送,可减少线上试错。
