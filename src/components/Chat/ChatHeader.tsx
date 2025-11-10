import { useChatStore } from '@/store'
import type { Conversation } from '@/types'

interface ChatHeaderProps {
  conversation: Conversation
}

export default function ChatHeader({ conversation }: ChatHeaderProps) {
  const { toggleSidebar } = useChatStore()

  return (
    <header className="border-b border-light-border dark:border-dark-border px-6 py-4 flex items-center gap-4 glass-light dark:glass-dark">
      {/* 移动端菜单按钮 */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* 对话标题 */}
      <h1 className="text-xl font-semibold text-light-text dark:text-dark-text">
        {conversation.title}
      </h1>

      {/* 消息数量 */}
      <span className="text-sm text-gray-500 dark:text-gray-400">
        ({conversation.messages.length} 条消息)
      </span>
    </header>
  )
}
