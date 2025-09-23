import type { ConvertedMovieDetail, MovieDetailResponse } from '../types/models'

const MAX_CACHE_SIZE = 50
const movieCache = new Map<number, ConvertedMovieDetail>()
const movieDetailCache = new Map<number, MovieDetailResponse>()

export function setMovieCache(id: number, data: ConvertedMovieDetail) {
  if (!movieCache.has(id) && movieCache.size >= MAX_CACHE_SIZE) {
    const firstKey = movieCache.keys().next().value
    if (firstKey !== undefined) {
      movieCache.delete(firstKey)
    }
  }
  movieCache.set(id, data)
}

export function getMovieCache(id: number) {
  return movieCache.get(id)
}

export function setMovieDetailCache(id: number, data: MovieDetailResponse) {
  if (!movieDetailCache.has(id) && movieDetailCache.size >= MAX_CACHE_SIZE) {
    const firstKey = movieDetailCache.keys().next().value
    if (firstKey !== undefined) {
      movieDetailCache.delete(firstKey)
    }
  }
  movieDetailCache.set(id, data)
}

export function getMovieDetailCache(id: number) {
  return movieDetailCache.get(id)
}
