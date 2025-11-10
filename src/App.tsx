import { useEffect } from 'react'
import { useChatStore } from '@/store'
import Sidebar from '@/components/Sidebar/Sidebar'
import ChatArea from '@/components/Chat/ChatArea'

function App() {
  const { initialize, isSidebarOpen } = useChatStore()

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* 侧边栏 */}
      <Sidebar />

      {/* 主对话区域 */}
      <main
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? 'ml-0' : 'ml-0'
        }`}
      >
        <ChatArea />
      </main>
    </div>
  )
}

export default App
