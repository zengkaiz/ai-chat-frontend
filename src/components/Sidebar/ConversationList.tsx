import { useChatStore } from '@/store'
import ConversationItem from './ConversationItem'

export default function ConversationList() {
  const { conversations } = useChatStore()

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar">
      <div className="p-2 space-y-1">
        {conversations.map((conversation) => (
          <ConversationItem key={conversation.id} conversation={conversation} />
        ))}

        {conversations.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            暂无对话
          </div>
        )}
      </div>
    </div>
  )
}
