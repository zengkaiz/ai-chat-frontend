// 消息角色
export type MessageRole = 'user' | 'assistant'

// 消息类型
export interface Message {
  id: string
  role: MessageRole
  content: string
  timestamp: string
}

// 会话类型
export interface Conversation {
  id: string
  title: string
  messages: Message[]
  createdAt: string
  updatedAt: string
}

// 主题类型
export type Theme = 'light' | 'dark'

// GraphQL 响应类型
export interface SendMessageResponse {
  sendMessage: Message
}

export interface ConversationsResponse {
  conversations: Conversation[]
}

export interface ConversationResponse {
  conversation: Conversation
}
