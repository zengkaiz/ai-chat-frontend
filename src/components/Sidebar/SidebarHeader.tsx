import { useChatStore } from '@/store'

export default function SidebarHeader() {
  const { createConversation } = useChatStore()

  const handleNewChat = () => {
    createConversation('新对话')
  }

  return (
    <div className="p-4 border-b border-light-border dark:border-dark-border">
      <button
        onClick={handleNewChat}
        className="w-full px-4 py-3 bg-light-primary dark:bg-dark-primary text-white rounded-lg
          hover:bg-light-primary-hover dark:hover:bg-dark-primary-hover
          transition-colors duration-200 font-medium"
      >
        + 新建对话
      </button>
    </div>
  )
}
