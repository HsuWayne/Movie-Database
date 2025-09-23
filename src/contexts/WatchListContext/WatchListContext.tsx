import { createContext, useContext } from 'react'

export interface WatchListContextType {
  watchList: number[]
  toggleWatchList: (id: number) => void
  isWatchList: (id: number) => boolean
}

export const WatchListContext = createContext<WatchListContextType | null>(null)

export function useWatchList() {
  const ctx = useContext(WatchListContext)
  if (!ctx) throw new Error('useWatchList 必須在 WatchListProvider 內使用')
  return ctx
}
