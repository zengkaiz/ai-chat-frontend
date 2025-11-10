# 前端项目技术选型

## 核心框架

### React + TypeScript + Vite
- **React**: ^18.3.0 - 用于构建用户界面的 JavaScript 库
- **TypeScript**: ^5.6.0 - 提供类型安全和更好的开发体验
- **Vite**: ^5.4.0 - 快速的前端构建工具，完美适配 Cloudflare Pages

**选型理由**：
- Vite 提供极快的开发服务器和构建速度
- 天然支持 TypeScript 和现代 ES 特性
- Cloudflare Pages 原生支持 Vite 项目部署

## GraphQL 客户端

### urql
- **@urql/core**: ^5.0.0
- **@urql/exchange-graphcache**: ^7.0.0

**选型理由**：
- 轻量级，适合 Cloudflare Pages 部署
- 优秀的缓存机制
- 完善的 TypeScript 支持
- 支持 SSR（如果需要）

**替代方案**：Apollo Client（功能更丰富但体积较大）

## UI 框架与样式

### Tailwind CSS
- **tailwindcss**: ^3.4.0
- **postcss**: ^8.4.0
- **autoprefixer**: ^10.4.0

**选型理由**：
- 原子化 CSS，减小最终包体积
- 开发效率高
- 易于定制主题

### UI 组件库（可选）
- **shadcn/ui** - 基于 Radix UI 和 Tailwind CSS 的组件集合
- **Radix UI** - 无样式的可访问性组件

## Markdown 渲染与代码高亮

### react-markdown
- **react-markdown**: ^9.0.0
- **remark-gfm**: ^4.0.0 - GitHub Flavored Markdown 支持

### 代码高亮
- **rehype-highlight**: ^7.0.0
- **highlight.js**: ^11.9.0

**选型理由**：
- react-markdown 轻量且可扩展
- 支持 GFM 语法（表格、任务列表等）
- highlight.js 支持多种编程语言

## 状态管理

### Zustand
- **zustand**: ^4.5.0

**选型理由**：
- 极简的 API，学习成本低
- 无需 Context Provider 包裹
- 完美的 TypeScript 支持
- 适合中小型项目

**替代方案**：
- Jotai（更原子化）
- React Context + useReducer（简单场景）

## 路由

### React Router
- **react-router-dom**: ^6.26.0

**选型理由**：
- React 生态最成熟的路由解决方案
- 支持嵌套路由和数据加载
- Cloudflare Pages 支持客户端路由

## 工具库

### 日期处理
- **date-fns**: ^3.6.0

### 工具函数
- **clsx**: ^2.1.0 - 条件类名组合
- **nanoid**: ^5.0.0 - 生成唯一 ID

## 开发工具

### ESLint + Prettier
- **eslint**: ^9.9.0
- **prettier**: ^3.3.0
- **@typescript-eslint/parser**: ^8.0.0
- **@typescript-eslint/eslint-plugin**: ^8.0.0

### Vite 插件
- **@vitejs/plugin-react-swc**: ^3.7.0 - 使用 SWC 加速编译

## 类型定义

### GraphQL Code Generator（推荐）
- **@graphql-codegen/cli**: ^5.0.0
- **@graphql-codegen/typescript**: ^4.0.0
- **@graphql-codegen/typescript-operations**: ^4.0.0
- **@graphql-codegen/typescript-urql**: ^4.0.0

**作用**：根据 GraphQL Schema 自动生成 TypeScript 类型定义和 hooks

## 部署配置

### Cloudflare Pages
- 构建命令: `npm run build`
- 构建输出目录: `dist`
- Node 版本: >=18

### 环境变量
```
VITE_GRAPHQL_ENDPOINT=https://your-worker.workers.dev/graphql
```

## 项目结构建议

```
frontend/
├── src/
│   ├── components/     # React 组件
│   ├── pages/          # 页面组件
│   ├── hooks/          # 自定义 Hooks
│   ├── stores/         # Zustand 状态管理
│   ├── graphql/        # GraphQL 查询和自动生成的类型
│   ├── utils/          # 工具函数
│   ├── types/          # TypeScript 类型定义
│   ├── App.tsx
│   └── main.tsx
├── public/             # 静态资源
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## 性能优化

1. **代码分割**：使用 React.lazy 和 Suspense 进行路由级代码分割
2. **资源优化**：图片使用 WebP 格式，Vite 自动处理资源优化
3. **缓存策略**：利用 urql 的缓存机制减少网络请求
4. **Tree Shaking**：Vite 自动移除未使用的代码

## 开发规范

1. **组件命名**：使用 PascalCase
2. **文件命名**：组件文件使用 PascalCase，工具文件使用 camelCase
3. **类型定义**：优先使用 interface，需要联合类型时使用 type
4. **代码格式**：统一使用 Prettier 格式化
5. **提交规范**：使用 Conventional Commits
