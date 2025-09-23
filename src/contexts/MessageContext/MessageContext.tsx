import { createContext, useContext } from 'react'

export interface MessageContextType {
  success: (content: string) => void
  error: (content: string) => void
  info: (content: string) => void
  warning: (content: string) => void
}

export const MessageContext = createContext<MessageContextType | null>(null)

export function useMessageContext() {
  const ctx = useContext(MessageContext)
  if (!ctx) throw new Error('useMessageContext 必須在 MessageProvider 內使用')
  return ctx
}
