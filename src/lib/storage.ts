import type { Conversation, Theme } from '@/types'

const STORAGE_KEYS = {
  CONVERSATIONS: 'ai_chat_conversations',
  CURRENT_CONVERSATION_ID: 'ai_chat_current_conversation_id',
  THEME: 'ai_chat_theme',
} as const

/**
 * 获取所有会话
 */
export function getConversations(): Conversation[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Failed to get conversations:', error)
    return []
  }
}

/**
 * 保存所有会话
 */
export function saveConversations(conversations: Conversation[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(conversations))
  } catch (error) {
    console.error('Failed to save conversations:', error)
  }
}

/**
 * 获取单个会话
 */
export function getConversation(id: string): Conversation | null {
  const conversations = getConversations()
  return conversations.find((conv) => conv.id === id) || null
}

/**
 * 保存单个会话
 */
export function saveConversation(conversation: Conversation): void {
  const conversations = getConversations()
  const index = conversations.findIndex((conv) => conv.id === conversation.id)

  if (index >= 0) {
    conversations[index] = conversation
  } else {
    conversations.unshift(conversation)
  }

  saveConversations(conversations)
}

/**
 * 删除会话
 */
export function deleteConversation(id: string): void {
  const conversations = getConversations()
  const filtered = conversations.filter((conv) => conv.id !== id)
  saveConversations(filtered)
}

/**
 * 获取当前会话 ID
 */
export function getCurrentConversationId(): string | null {
  return localStorage.getItem(STORAGE_KEYS.CURRENT_CONVERSATION_ID)
}

/**
 * 设置当前会话 ID
 */
export function setCurrentConversationId(id: string | null): void {
  if (id) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_CONVERSATION_ID, id)
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_CONVERSATION_ID)
  }
}

/**
 * 获取主题
 */
export function getTheme(): Theme {
  const theme = localStorage.getItem(STORAGE_KEYS.THEME) as Theme | null
  return theme || 'light'
}

/**
 * 保存主题
 */
export function saveTheme(theme: Theme): void {
  localStorage.setItem(STORAGE_KEYS.THEME, theme)
}
