import { useChatStore } from '@/store'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import ChatHeader from './ChatHeader'

export default function ChatArea() {
  const { currentConversationId, conversations } = useChatStore()

  const currentConversation = conversations.find(
    (conv) => conv.id === currentConversationId
  )

  if (!currentConversation) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p className="text-lg">选择一个对话或创建新对话开始聊天!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* 头部 */}
      <ChatHeader conversation={currentConversation} />

      {/* 消息列表 */}
      <MessageList conversation={currentConversation} />

      {/* 输入区 */}
      <MessageInput conversationId={currentConversation.id} />
    </div>
  )
}
