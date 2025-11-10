# AI Chat Frontend

基于 React + TypeScript + Vite 构建的 AI 对话应用前端，部署在 Cloudflare Pages。

## 技术栈

查看 [TECH_STACK.md](./TECH_STACK.md) 了解详细的技术选型说明。

核心技术：
- React18 + TypeScript
- Vite - 构建工具
- urql - GraphQL 客户端
- Tailwind CSS - 样式框架
- Zustand - 状态管理
- react-markdown - Markdown 渲染 

## 快速开始

### 前置要求

- Node.js >= 18
- npm >= 9

### 安装依赖

```bash
npm install
```

### 环境变量配置

创建 `.env` 文件：

```env
VITE_GRAPHQL_ENDPOINT=http://localhost:8787/graphql
```

生产环境在 Cloudflare Pages 中配置：

```env
VITE_GRAPHQL_ENDPOINT=https://your-worker.workers.dev/graphql
```

### 开发

启动开发服务器：

```bash
npm run dev
```

访问 http://localhost:5173

### 构建

```bash
npm run build
```

构建产物在 `dist` 目录。

### 预览构建产物

```bash
npm run preview
```

### 代码检查

```bash
# ESLint 检查
npm run lint

# 类型检查
npm run type-check
```

## GraphQL 类型生成

项目使用 GraphQL Code Generator 自动生成类型定义。

### 配置 GraphQL 端点

在 `codegen.ts` 中配置后端 GraphQL Schema 地址：

```typescript
const config: CodegenConfig = {
  schema: 'http://localhost:8787/graphql', // 或远程地址
  // ...
}
```

### 生成类型

```bash
npm run codegen
```

这将根据 GraphQL Schema 生成：
- TypeScript 类型定义
- urql hooks（自动生成 useQuery、useMutation）

## 项目结构

```
src/
├── components/          # React 组件
│   ├── chat/           # 聊天相关组件
│   ├── markdown/       # Markdown 渲染组件
│   └── ui/             # UI 基础组件
├── pages/              # 页面组件
│   ├── ChatPage.tsx    # 聊天主页面
│   └── HistoryPage.tsx # 历史记录页面
├── hooks/              # 自定义 Hooks
│   ├── useChat.ts      # 聊天逻辑
│   └── useHistory.ts   # 历史记录
├── stores/             # Zustand 状态管理
│   └── chatStore.ts    # 聊天状态
├── graphql/            # GraphQL 相关
│   ├── queries/        # GraphQL 查询
│   ├── mutations/      # GraphQL 变更
│   └── generated/      # 自动生成的类型
├── utils/              # 工具函数
│   └── formatters.ts   # 格式化工具
├── types/              # TypeScript 类型定义
│   └── chat.ts         # 聊天相关类型
├── App.tsx             # 根组件
└── main.tsx            # 入口文件
```

## 核心功能

### 1. AI 对话

- 实时发送消息到 AI
- 支持流式响应（SSE）
- Markdown 格式化显示
- 代码高亮

### 2. 对话历史

- 本地存储对话记录
- 加载历史对话
- 创建新对话
- 删除对话

### 3. UI 特性

- 响应式设计
- 暗色模式支持
- 代码复制功能
- 消息加载状态

## 部署

### Cloudflare Pages 部署

#### 通过 Dashboard 部署

1. 连接 GitHub 仓库
2. 配置构建设置：
   - 构建命令: `npm run build`
   - 构建输出目录: `dist`
   - Root directory: 留空（或填写 `frontend` 如果在 monorepo 中）
3. 设置环境变量：
   - `VITE_GRAPHQL_ENDPOINT`: GraphQL API 地址
4. 部署

#### 通过 Wrangler CLI 部署

```bash
npm install -g wrangler

# 登录
wrangler login

# 构建
npm run build

# 部署
wrangler pages deploy dist --project-name=ai-chat-frontend
```

### 部署检查清单

- [ ] 配置正确的 VITE_GRAPHQL_ENDPOINT
- [ ] 确保 CORS 在后端正确配置
- [ ] 检查构建产物大小
- [ ] 测试生产环境功能

## 开发规范

### 组件开发

```typescript
// 使用 TypeScript 接口定义 Props
interface MessageProps {
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

// 使用函数组件 + Hooks
export function Message({ content, role, timestamp }: MessageProps) {
  // ...
}
```

### 状态管理

```typescript
// 使用 Zustand
import { create } from 'zustand'

interface ChatStore {
  messages: Message[]
  addMessage: (message: Message) => void
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message]
  }))
}))
```

### GraphQL 查询

```typescript
// src/graphql/queries/chat.graphql
query SendMessage($input: ChatInput!) {
  chat(input: $input) {
    id
    content
    role
    createdAt
  }
}
```

```typescript
// 使用自动生成的 Hook
import { useSendMessageQuery } from '@/graphql/generated'

function ChatComponent() {
  const [result] = useSendMessageQuery({
    variables: { input: { message: 'Hello' } }
  })
  // ...
}
```

## 性能优化

1. **懒加载路由**
```typescript
const HistoryPage = lazy(() => import('./pages/HistoryPage'))
```

2. **Memo 化组件**
```typescript
export const Message = memo(MessageComponent)
```

3. **虚拟滚动**（对于长对话列表）
```typescript
import { useVirtualizer } from '@tanstack/react-virtual'
```

## 故障排查

### GraphQL 连接失败

- 检查 `VITE_GRAPHQL_ENDPOINT` 环境变量
- 确认后端服务正在运行
- 检查浏览器控制台的 CORS 错误

### 构建失败

- 清除缓存: `rm -rf node_modules .vite dist && npm install`
- 检查 TypeScript 类型错误: `npm run type-check`

### 样式问题

- 确保 Tailwind CSS 配置正确
- 检查 `postcss.config.js` 配置

## License

MIT
