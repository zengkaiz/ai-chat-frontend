import { useChatStore } from '@/store'
import ConversationList from './ConversationList'
import SidebarHeader from './SidebarHeader'

export default function Sidebar() {
  const { isSidebarOpen } = useChatStore()

  return (
    <>
      {/* 侧边栏容器 */}
      <aside
        className={`
          fixed lg:relative top-0 left-0 h-full z-40
          glass-light dark:glass-dark
          border-r border-light-border dark:border-dark-border
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-0'}
          ${isSidebarOpen ? 'w-72 sm:w-80 lg:w-64' : 'w-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* 头部：新建对话按钮 */}
          <SidebarHeader />

          {/* 会话列表 */}
          <ConversationList />
        </div>
      </aside>

      {/* 移动端遮罩层 */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => useChatStore.getState().setSidebarOpen(false)}
        />
      )}
    </>
  )
}
