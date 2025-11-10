# 前端部署指南 - Cloudflare Pages

本指南将帮助你将 AI 聊天助手前端部署到 Cloudflare Pages。

## 📋 前置要求

- Cloudflare 账户 (免费账户即可)
- GitHub 账户
- 已将前端代码推送到 GitHub 仓库

## 🚀 部署步骤

### 方法一：通过 Cloudflare Pages Dashboard (推荐)

#### 1. 推送代码到 GitHub 仓库

确保代码已推送到 GitHub 仓库（`ai-chat-frontend`）。

使用 Claude Code 的 MCP GitHub 工具推送代码：

```
请使用 MCP GitHub 工具将前端代码推送到仓库：
- 仓库：ai-chat-frontend
- 分支：main
- 提交信息：Initial commit: AI Chat Frontend
```

如果仓库尚未创建，请参考 [GitHub 仓库设置指南](../GITHUB_SETUP.md)。

#### 2. 连接到 Cloudflare Pages

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 点击左侧菜单 **Workers & Pages**
3. 点击 **Create application** 按钮
4. 选择 **Pages** 标签
5. 点击 **Connect to Git**

#### 3. 配置 Git 集成

1. 选择你的 GitHub 账户并授权
2. 选择 `ai-chat-frontend` 仓库
3. 点击 **Begin setup**

#### 4. 配置构建设置

在构建配置页面填写以下信息：

| 配置项 | 值 |
|-------|---|
| **Project name** | `ai-chat-frontend` (或自定义) |
| **Production branch** | `main` |
| **Framework preset** | `None` (或选择 Vite) |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |

#### 5. 配置环境变量

在 **Environment variables** 部分添加：

| 变量名 | 值 | 说明 |
|-------|---|------|
| `VITE_GRAPHQL_ENDPOINT` | `https://your-worker.workers.dev/graphql` | 后端 API 地址（稍后替换） |
| `NODE_VERSION` | `18` | Node.js 版本 |

**注意**：暂时先用占位符，等后端部署完成后再更新此环境变量。

#### 6. 开始部署

1. 点击 **Save and Deploy** 按钮
2. Cloudflare Pages 将自动：
   - 克隆你的仓库
   - 安装依赖 (`npm install`)
   - 运行构建命令 (`npm run build`)
   - 部署到全球 CDN

部署过程大约需要 2-5 分钟。

#### 7. 查看部署结果

部署完成后，你会得到：
- **Production URL**: `https://ai-chat-frontend.pages.dev`
- **Custom domain**: 可以配置自定义域名

### 方法二：通过 Wrangler CLI

如果你更喜欢命令行工具：

#### 1. 安装 Wrangler

```bash
npm install -g wrangler
```

#### 2. 登录 Cloudflare

```bash
wrangler login
```

#### 3. 创建 Pages 项目

```bash
# 构建项目
npm run build

# 部署到 Pages
wrangler pages deploy dist --project-name=ai-chat-frontend
```

#### 4. 设置环境变量

```bash
wrangler pages secret put VITE_GRAPHQL_ENDPOINT --project-name=ai-chat-frontend
# 输入值: https://your-worker.workers.dev/graphql
```

## 🔧 更新后端 API 地址

等后端部署完成后，你需要更新 `VITE_GRAPHQL_ENDPOINT`：

### 通过 Dashboard 更新

1. 进入 Cloudflare Pages 项目设置
2. 点击 **Settings** → **Environment variables**
3. 编辑 `VITE_GRAPHQL_ENDPOINT` 变量
4. 将值改为你的 Worker URL：`https://your-worker-name.workers.dev/graphql`
5. 保存后重新部署

### 通过 CLI 更新

```bash
# 设置生产环境变量
wrangler pages secret put VITE_GRAPHQL_ENDPOINT --env production --project-name=ai-chat-frontend
```

**更新环境变量后需要重新部署**：
- 在 Dashboard 中点击 **Retry deployment**
- 或者推送新的代码到 GitHub 触发自动部署

## 🌐 配置自定义域名 (可选)

### 1. 添加自定义域名

1. 进入 Pages 项目设置
2. 点击 **Custom domains**
3. 点击 **Set up a custom domain**
4. 输入你的域名（例如 `chat.yourdomain.com`）

### 2. 配置 DNS

Cloudflare 会自动为你配置 DNS 记录（如果域名在 Cloudflare 管理）。

如果域名不在 Cloudflare：
- 添加 CNAME 记录指向 `ai-chat-frontend.pages.dev`

## 🔄 自动部署

配置后，每次推送到 GitHub 的 `main` 分支都会自动触发部署：

使用 Claude Code 的 MCP GitHub 工具推送更新：

```
请使用 MCP GitHub 工具推送更改：
- 仓库：ai-chat-frontend
- 分支：main
- 提交信息：Update feature

Cloudflare Pages 会自动部署新版本
```

### 预览部署

推送到其他分支会创建预览部署：

使用 Claude Code 的 MCP GitHub 工具管理分支：

```
请使用 MCP GitHub 工具创建并推送功能分支：
- 仓库：ai-chat-frontend
- 新分支：feature/new-ui
- 基于分支：main
- 推送更改到新分支

会得到预览 URL: https://abc123.ai-chat-frontend.pages.dev
```

## ✅ 验证部署

部署完成后，访问你的 Pages URL：

1. **检查页面加载**：确认前端界面正常显示
2. **检查控制台**：打开浏览器开发者工具，确认没有错误
3. **测试主题切换**：验证深色/浅色主题切换正常
4. **测试 API 连接**：发送消息，确认能连接到后端

## 🔍 常见问题

### 1. 构建失败：`npm install` 失败

**解决方案**：
- 检查 `package.json` 是否正确
- 确认 Node 版本设置为 18+

### 2. 环境变量未生效

**问题**：API 请求失败，提示连接不到后端

**解决方案**：
1. 确认环境变量名是否正确（必须以 `VITE_` 开头）
2. 更新环境变量后需要重新部署
3. 检查浏览器控制台，查看实际的 API 地址

### 3. CORS 错误

**问题**：浏览器控制台显示 CORS 错误

**解决方案**：
- 确认后端的 `ALLOWED_ORIGINS` 包含你的 Pages URL
- 更新后端环境变量：
  ```
  ALLOWED_ORIGINS=https://ai-chat-frontend.pages.dev,https://chat.yourdomain.com
  ```

### 4. 页面空白

**问题**：部署后页面空白

**解决方案**：
1. 检查构建输出目录是否正确（应该是 `dist`）
2. 查看部署日志确认构建成功
3. 检查路由配置（SPA 需要配置重定向）

### 5. 404 错误

**问题**：刷新页面后显示 404

**解决方案**：
Cloudflare Pages 默认支持 SPA，但如果遇到问题，可以添加 `_redirects` 文件：

在 `public/` 目录创建 `_redirects` 文件：
```
/*    /index.html   200
```

## 📊 性能优化

### 1. 启用分析

在 Pages 项目设置中启用 **Web Analytics**，免费获取访问数据。

### 2. 配置缓存

Cloudflare Pages 自动配置最佳缓存策略。

### 3. 图片优化

使用 Cloudflare Images 或将图片放在 CDN。

## 🛡️ 安全设置

### 1. 配置安全头部

创建 `public/_headers` 文件：

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### 2. 启用 HTTPS

Cloudflare Pages 自动提供 HTTPS，无需配置。

## 📈 监控和日志

### 查看部署历史

1. 进入 Pages 项目
2. 点击 **Deployments** 标签
3. 查看所有部署记录和日志

### 查看实时日志

```bash
wrangler pages deployment tail --project-name=ai-chat-frontend
```

## 🔗 相关链接

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html)
- [后端部署指南](../serverless/DEPLOYMENT.md)

## 📝 部署清单

部署前检查：

- [ ] 代码已推送到 GitHub
- [ ] `package.json` 配置正确
- [ ] 构建命令测试通过 (`npm run build`)
- [ ] 环境变量已配置
- [ ] 后端 API 地址已确认

部署后检查：

- [ ] 页面正常加载
- [ ] 主题切换正常
- [ ] API 连接正常
- [ ] 移动端适配正常
- [ ] 自定义域名配置（如需要）

---

**下一步**：部署后端到 Cloudflare Workers

参考：`serverless/DEPLOYMENT.md`
