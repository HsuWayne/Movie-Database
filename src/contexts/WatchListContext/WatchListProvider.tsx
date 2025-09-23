import { useState, useEffect } from 'react'
import type { WatchListContextType } from './WatchListContext'
import { WatchListContext } from './WatchListContext'
import { getWatchList, saveWatchList } from '../../utils/localStorage'

export function WatchListProvider({ children }: { children: React.ReactNode }) {
  const [watchList, setWatchList] = useState<number[]>([])

  useEffect(() => {
    setWatchList(getWatchList())
  }, [])

  const toggleWatchList: WatchListContextType['toggleWatchList'] = (
    id: number
  ) => {
    setWatchList((prev) => {
      let updated: number[]
      if (prev.includes(id)) {
        updated = prev.filter((f) => f !== id)
      } else {
        updated = [...prev, id]
      }
      saveWatchList(updated)
      return updated
    })
  }

  const isWatchList: WatchListContextType['isWatchList'] = (id: number) =>
    watchList.includes(id)

  return (
    <WatchListContext.Provider
      value={{ watchList, toggleWatchList, isWatchList }}
    >
      {children}
    </WatchListContext.Provider>
  )
}
