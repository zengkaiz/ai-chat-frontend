import { useChatStore } from '@/store'
import ConversationList from './ConversationList'
import SidebarHeader from './SidebarHeader'
import SidebarFooter from './SidebarFooter'

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
          ${isSidebarOpen ? 'w-64' : 'w-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* 头部：新建对话按钮 */}
          <SidebarHeader />

          {/* 会话列表 */}
          <ConversationList />

          {/* 底部：设置和主题切换 */}
          <SidebarFooter />
        </div>
      </aside>

      {/* 移动端遮罩层 */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => useChatStore.getState().setSidebarOpen(false)}
        />
      )}
    </>
  )
}
