import type { Message } from '@/types'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'

interface MessageBubbleProps {
  message: Message
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in animate-slide-up`}
    >
      <div
        className={`
          max-w-[80%] rounded-bubble px-4 py-3
          ${
            isUser
              ? 'bg-light-primary dark:bg-dark-primary text-white rounded-br-md shadow-lg'
              : 'glass-light dark:glass-dark text-light-text dark:text-dark-text rounded-bl-md'
          }
        `}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                // 自定义代码块样式
                code({ className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !match ? (
                    <code
                      className="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded text-sm"
                      {...props}
                    >
                      {children}
                    </code>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                },
                // 自定义链接样式
                a({ node, children, ...props }) {
                  return (
                    <a
                      className="text-blue-500 hover:text-blue-600 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                      {...props}
                    >
                      {children}
                    </a>
                  )
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  )
}
