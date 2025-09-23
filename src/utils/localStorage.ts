const STORAGE_KEY = 'watchList'

export function getWatchList(): number[] {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

export function saveWatchList(list: number[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}
