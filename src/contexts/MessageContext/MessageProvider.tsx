import type { MessageContextType } from './MessageContext'
import { MessageContext } from './MessageContext'
import { message } from 'antd'

export function MessageProvider({ children }: { children: React.ReactNode }) {
  const [messageApi, contextHolder] = message.useMessage()

  const value: MessageContextType = {
    success: (content) => messageApi.success(content),
    error: (content) => messageApi.error(content),
    info: (content) => messageApi.info(content),
    warning: (content) => messageApi.warning(content)
  }

  return (
    <MessageContext.Provider value={value}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  )
}
