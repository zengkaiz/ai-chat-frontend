import { create } from 'zustand'
import { nanoid } from 'nanoid'
import type { Conversation, Message, Theme } from '@/types'
import {
  getConversations,
  saveConversation,
  deleteConversation as deleteConversationFromStorage,
  getCurrentConversationId,
  setCurrentConversationId,
  getTheme,
  saveTheme,
} from '@/lib/storage'

interface ChatStore {
  // 状态
  conversations: Conversation[]
  currentConversationId: string | null
  theme: Theme
  isSidebarOpen: boolean
  isLoading: boolean

  // 会话操作
  createConversation: (title?: string) => Conversation
  deleteConversation: (id: string) => void
  setCurrentConversation: (id: string) => void
  updateConversationTitle: (id: string, title: string) => void

  // 消息操作
  addMessage: (conversationId: string, message: Message) => void
  updateMessage: (conversationId: string, messageId: string, content: string) => void

  // UI 操作
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  setLoading: (loading: boolean) => void

  // 初始化
  initialize: () => void
}

export const useChatStore = create<ChatStore>((set, get) => ({
  // 初始状态
  conversations: [],
  currentConversationId: null,
  theme: 'light',
  isSidebarOpen: true,
  isLoading: false,

  // 初始化
  initialize: () => {
    const conversations = getConversations()
    const currentId = getCurrentConversationId()
    const theme = getTheme()

    // 如果没有会话，创建一个默认会话
    if (conversations.length === 0) {
      const newConv = get().createConversation('新对话')
      set({ conversations: [newConv], currentConversationId: newConv.id, theme })
    } else {
      set({ conversations, currentConversationId: currentId, theme })
    }

    // 应用主题到 document
    document.documentElement.classList.toggle('dark', theme === 'dark')
  },

  // 创建会话
  createConversation: (title = '新对话') => {
    const newConversation: Conversation = {
      id: nanoid(),
      title,
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    saveConversation(newConversation)
    setCurrentConversationId(newConversation.id)

    set((state) => ({
      conversations: [newConversation, ...state.conversations],
      currentConversationId: newConversation.id,
    }))

    return newConversation
  },

  // 删除会话
  deleteConversation: (id: string) => {
    deleteConversationFromStorage(id)

    set((state) => {
      const filtered = state.conversations.filter((conv) => conv.id !== id)
      let newCurrentId = state.currentConversationId

      // 如果删除的是当前会话，切换到第一个会话
      if (state.currentConversationId === id) {
        newCurrentId = filtered.length > 0 ? filtered[0].id : null
        setCurrentConversationId(newCurrentId)
      }

      return {
        conversations: filtered,
        currentConversationId: newCurrentId,
      }
    })
  },

  // 设置当前会话
  setCurrentConversation: (id: string) => {
    setCurrentConversationId(id)
    set({ currentConversationId: id })
  },

  // 更新会话标题
  updateConversationTitle: (id: string, title: string) => {
    set((state) => {
      const conversations = state.conversations.map((conv) =>
        conv.id === id
          ? { ...conv, title, updatedAt: new Date().toISOString() }
          : conv
      )

      // 保存到 localStorage
      const updated = conversations.find((conv) => conv.id === id)
      if (updated) {
        saveConversation(updated)
      }

      return { conversations }
    })
  },

  // 添加消息
  addMessage: (conversationId: string, message: Message) => {
    set((state) => {
      const conversations = state.conversations.map((conv) => {
        if (conv.id === conversationId) {
          const updatedConv = {
            ...conv,
            messages: [...conv.messages, message],
            updatedAt: new Date().toISOString(),
          }
          saveConversation(updatedConv)
          return updatedConv
        }
        return conv
      })

      return { conversations }
    })
  },

  // 更新消息（用于流式输出）
  updateMessage: (conversationId: string, messageId: string, content: string) => {
    set((state) => {
      const conversations = state.conversations.map((conv) => {
        if (conv.id === conversationId) {
          const updatedConv = {
            ...conv,
            messages: conv.messages.map((msg) =>
              msg.id === messageId ? { ...msg, content } : msg
            ),
            updatedAt: new Date().toISOString(),
          }
          saveConversation(updatedConv)
          return updatedConv
        }
        return conv
      })

      return { conversations }
    })
  },

  // 切换侧边栏
  toggleSidebar: () => {
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen }))
  },

  // 设置侧边栏状态
  setSidebarOpen: (open: boolean) => {
    set({ isSidebarOpen: open })
  },

  // 设置主题
  setTheme: (theme: Theme) => {
    saveTheme(theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
    set({ theme })
  },

  // 切换主题
  toggleTheme: () => {
    const newTheme = get().theme === 'light' ? 'dark' : 'light'
    get().setTheme(newTheme)
  },

  // 设置加载状态
  setLoading: (loading: boolean) => {
    set({ isLoading: loading })
  },
}))
