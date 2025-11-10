import { useChatStore } from '@/store'
import type { Conversation } from '@/types'
import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'

interface ConversationItemProps {
  conversation: Conversation
}

export default function ConversationItem({ conversation }: ConversationItemProps) {
  const { currentConversationId, setCurrentConversation, deleteConversation } = useChatStore()
  const isActive = currentConversationId === conversation.id

  const handleClick = () => {
    setCurrentConversation(conversation.id)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm('确定要删除这个对话吗？')) {
      deleteConversation(conversation.id)
    }
  }

  const timeAgo = formatDistanceToNow(new Date(conversation.updatedAt), {
    addSuffix: true,
    locale: zhCN,
  })

  return (
    <div
      onClick={handleClick}
      className={`
        group relative px-3 py-3 rounded-lg cursor-pointer
        transition-all duration-200
        ${
          isActive
            ? 'bg-light-primary/10 dark:bg-dark-primary/10 border-l-2 border-light-primary dark:border-dark-primary'
            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
        }
      `}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm truncate text-light-text dark:text-dark-text">
            {conversation.title}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {timeAgo}
          </p>
        </div>

        {/* 删除按钮 */}
        <button
          onClick={handleDelete}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded"
        >
          <svg
            className="w-4 h-4 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
