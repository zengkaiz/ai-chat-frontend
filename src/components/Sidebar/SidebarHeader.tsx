import { useChatStore } from '@/store'

export default function SidebarHeader() {
  const { createConversation } = useChatStore()

  const handleNewChat = () => {
    createConversation('新对话')
  }

  return (
    <div className="p-3 sm:p-4 border-b border-light-border dark:border-dark-border">
      <button
        onClick={handleNewChat}
        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 
          bg-gradient-to-r from-indigo-600 to-purple-600
          dark:from-indigo-500 dark:to-purple-500
          text-white text-sm sm:text-base rounded-lg
          hover:from-indigo-700 hover:to-purple-700
          dark:hover:from-indigo-600 dark:hover:to-purple-600
          transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
      >
        + 新建对话
      </button>
    </div>
  )
}
