import { useState, useRef, KeyboardEvent } from 'react'
import { useChatStore } from '@/store'
import { useMutation } from 'urql'
import { nanoid } from 'nanoid'
import { SEND_MESSAGE_MUTATION } from '@/lib/graphql'
import type { Message } from '@/types'

interface MessageInputProps {
  conversationId: string
}

export default function MessageInput({ conversationId }: MessageInputProps) {
  const [input, setInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { addMessage, updateConversationTitle } = useChatStore()

  const [, sendMessageMutation] = useMutation(SEND_MESSAGE_MUTATION)

  const handleSubmit = async () => {
    if (!input.trim() || isSubmitting) return

    const userMessage: Message = {
      id: nanoid(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
    }

    // 添加用户消息
    addMessage(conversationId, userMessage)

    // 清空输入框
    const messageContent = input.trim()
    setInput('')
    setIsSubmitting(true)

    try {
      // 如果是第一条消息，自动生成标题
      const conversation = useChatStore
        .getState()
        .conversations.find((c) => c.id === conversationId)

      if (conversation && conversation.messages.length === 0) {
        const title = messageContent.slice(0, 30) + (messageContent.length > 30 ? '...' : '')
        updateConversationTitle(conversationId, title)
      }

      // 发送消息到后端
      const result = await sendMessageMutation({
        conversationId,
        message: messageContent,
      })

      if (result.data?.sendMessage) {
        // 添加 AI 回复
        addMessage(conversationId, result.data.sendMessage)
      } else if (result.error) {
        console.error('发送消息失败:', result.error)
        // 显示错误消息
        const errorMessage: Message = {
          id: nanoid(),
          role: 'assistant',
          content: '抱歉，发送消息失败，请稍后重试。错误信息: ' + result.error.message,
          timestamp: new Date().toISOString(),
        }
        addMessage(conversationId, errorMessage)
      }
    } catch (error) {
      console.error('发送消息异常:', error)
      const errorMessage: Message = {
        id: nanoid(),
        role: 'assistant',
        content: '抱歉，发生了未知错误，请稍后重试。',
        timestamp: new Date().toISOString(),
      }
      addMessage(conversationId, errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  // 自动调整文本框高度
  const adjustHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px'
    }
  }

  return (
    <div className="border-t border-light-border dark:border-dark-border p-3 sm:p-6 glass-light dark:glass-dark">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-stretch sm:items-end">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value)
                adjustHeight()
              }}
              onKeyDown={handleKeyDown}
              placeholder="输入消息..."
              rows={1}
              disabled={isSubmitting}
              className="
                w-full px-3 sm:px-4 py-2.5 sm:py-3
                bg-white/50 dark:bg-dark-bg/50
                backdrop-blur-sm
                border border-light-border dark:border-dark-border
                rounded-xl resize-none
                focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                disabled:opacity-50 disabled:cursor-not-allowed
                text-sm sm:text-base
                text-light-text dark:text-dark-text
                placeholder:text-gray-400 dark:placeholder:text-gray-500
                transition-all duration-200
              "
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!input.trim() || isSubmitting}
            className="
              px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl
              bg-gradient-to-r from-indigo-600 to-purple-600
              dark:from-indigo-500 dark:to-purple-500
              text-white font-medium text-sm sm:text-base
              hover:from-indigo-700 hover:to-purple-700
              dark:hover:from-indigo-600 dark:hover:to-purple-600
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200
              flex items-center justify-center gap-2
              shadow-lg hover:shadow-xl
            "
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 sm:h-5 sm:w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>发送中...</span>
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                <span>发送</span>
              </>
            )}
          </button>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center hidden sm:block">
          按 Enter 发送，Shift+Enter 换行
        </p>
      </div>
    </div>
  )
}
