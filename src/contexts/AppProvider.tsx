import type { ReactNode } from 'react'
import { MessageProvider } from './MessageContext/MessageProvider'
import { WatchListProvider } from './WatchListContext/WatchListProvider'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <MessageProvider>
      <WatchListProvider>{children}</WatchListProvider>
    </MessageProvider>
  )
}
