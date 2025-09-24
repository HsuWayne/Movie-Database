import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import {
  getMovieList,
  searchMovies,
  searchMovieById,
  getMovieDetail
} from '../src/api/tmdb'
import type {
  MovieListResponse,
  ConvertedMovieDetail,
  MovieDetailResponse
} from '../src/types/models'
import {
  mockMovieListSuccess,
  mockMovieListIncomplete,
  mockSearchMovieByIdSuccess,
  mockSearchMovieByIdIncomplete,
  mockMovieDetailSuccess,
  mockMovieDetailIncomplete
} from './mockApiResponse'

vi.mock('axios')
const mockedAxios = axios as unknown as {
  get: ReturnType<typeof vi.fn>
}

describe('tmdb.ts API service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('getMovieList - 正常回傳資料', async () => {
    mockedAxios.get = vi.fn().mockResolvedValue(mockMovieListSuccess)
    const result: MovieListResponse = await getMovieList('popular', '1')

    expect(result.page).toBe(1)
    expect(result.total_pages).toBe(10)
    expect(result.total_results).toBe(100)
    expect(result.results[0].title).toBe('測試電影')
    expect(result.results[0].genre_ids).toContain('動作')
  })

  it('getMovieList - 後端回傳不完整資料', async () => {
    mockedAxios.get = vi.fn().mockResolvedValue(mockMovieListIncomplete)
    const result: MovieListResponse = await getMovieList('popular', '1')

    expect(result.page).toBe(1)
    expect(result.total_pages).toBe(0)
    expect(result.total_results).toBe(0)
    expect(result.results).toEqual([])
  })

  it('searchMovies - 正常回傳資料', async () => {
    mockedAxios.get = vi.fn().mockResolvedValue(mockMovieListSuccess)
    const result: MovieListResponse = await searchMovies('popular', '1')

    expect(result.page).toBe(1)
    expect(result.total_pages).toBe(10)
    expect(result.total_results).toBe(100)
    expect(result.results[0].title).toBe('測試電影')
    expect(result.results[0].genre_ids).toContain('動作')
  })

  it('searchMovies - 後端回傳不完整資料', async () => {
    mockedAxios.get = vi.fn().mockResolvedValue(mockMovieListIncomplete)
    const result: MovieListResponse = await searchMovies('popular', '1')

    expect(result.page).toBe(1)
    expect(result.total_pages).toBe(0)
    expect(result.total_results).toBe(0)
    expect(result.results).toEqual([])
  })

  it('searchMovieById - 正常回傳資料', async () => {
    mockedAxios.get = vi.fn().mockResolvedValue(mockSearchMovieByIdSuccess)
    const result: ConvertedMovieDetail = await searchMovieById(10)

    expect(result.id).toBe(10)
    expect(result.original_language).toBe('日文')
    expect(result.backdrop_path).toBe('/jp_bg.jpg')
    expect(result.release_date).toBe('2025-02-02')
    expect(result.genre_ids).toContain('動作')
  })

  it('searchMovieById - 後端回傳不完整資料', async () => {
    mockedAxios.get = vi.fn().mockResolvedValue(mockSearchMovieByIdIncomplete)
    const result: ConvertedMovieDetail = await searchMovieById(10)

    expect(result.id).toBe(-1)
    expect(result.original_language).toBe('未知語言')
    expect(result.backdrop_path).toBe('')
    expect(result.release_date).toBe('0000-00-00')
    expect(result.genre_ids).toContain('-1')
  })

  it('getMovieDetail - 正常回傳資料', async () => {
    mockedAxios.get = vi.fn().mockResolvedValue(mockMovieDetailSuccess)
    const result: MovieDetailResponse = await getMovieDetail(999)

    expect(result.id).toBe(999)
    expect(result.title).toBe('ID 查詢電影')
    expect(result.adult).toBe(false)
    expect(result.runtime).toBe(120)
    expect(result.videos.results).toEqual([])
    expect(result.reviews.total_results).toBe(40)
  })

  it('getMovieDetail - 後端回傳不完整資料', async () => {
    mockedAxios.get = vi.fn().mockResolvedValue(mockMovieDetailIncomplete)
    const result: MovieDetailResponse = await getMovieDetail(999)

    expect(result.id).toBe(-1)
    expect(result.title).toBe('無標題')
    expect(result.adult).toBe(false)
    expect(result.runtime).toBe(0)
    expect(result.videos.results).toEqual([])
    expect(result.reviews.total_results).toBe(0)
  })
})
