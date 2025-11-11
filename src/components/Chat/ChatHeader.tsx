import { useChatStore } from '@/store'
import type { Conversation } from '@/types'

interface ChatHeaderProps {
  conversation: Conversation
}

export default function ChatHeader({ conversation }: ChatHeaderProps) {
  const { toggleSidebar } = useChatStore()

  return (
    <header className="border-b border-light-border dark:border-dark-border px-4 sm:px-6 py-3 sm:py-4 glass-light dark:glass-dark">
      <div className="flex items-center gap-3 sm:gap-4">
        {/* 移动端菜单按钮 */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
          aria-label="切换侧边栏"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
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

        {/* Logo 和应用标题 */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {/* Logo 图标 */}
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          
          {/* 应用名称 */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 min-w-0">
            <h1 className="text-base sm:text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent whitespace-nowrap">
              AI智能问答小助手
            </h1>
            <span className="hidden sm:inline text-gray-400 dark:text-gray-600">|</span>
            <span className="text-xs sm:text-sm text-light-text dark:text-dark-text truncate">
              {conversation.title}
            </span>
          </div>
        </div>

        {/* 消息数量 */}
        <span className="ml-auto text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
          {conversation.messages.length} 条
        </span>
      </div>
    </header>
  )
}
