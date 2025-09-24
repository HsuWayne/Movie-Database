import axios from 'axios'
import type {
  MovieListResponse,
  ConvertedMovieDetail,
  MovieDetailResponse
} from '../types/models'
import {
  safeGet,
  convertedMovies,
  convertedMovie,
  convertedMovieDetail
} from '../utils/apiService'
import { BASE_URL } from '../types/variables'

const API_KEY = import.meta.env.VITE_API_KEY

export async function getMovieList(
  type: string,
  page: string
): Promise<MovieListResponse> {
  const res = await axios.get(`${BASE_URL}/movie/${type}`, {
    params: { api_key: API_KEY, page, language: 'zh-TW' }
  })
  const convertedMovieListData: MovieListResponse = {
    page: safeGet<number>(res.data.page, 1),
    total_pages: safeGet<number>(res.data.total_pages, 0),
    total_results: safeGet<number>(res.data.total_results, 0),
    results: convertedMovies(safeGet(res.data.results, []))
  }
  return convertedMovieListData
}

export async function searchMovies(
  query: string,
  page: string
): Promise<MovieListResponse> {
  const res = await axios.get(`${BASE_URL}/search/movie`, {
    params: { api_key: API_KEY, query, page, language: 'zh-TW' }
  })
  const convertedMovieListData: MovieListResponse = {
    page: safeGet<number>(res.data.page, 1),
    total_pages: safeGet<number>(res.data.total_pages, 0),
    total_results: safeGet<number>(res.data.total_results, 0),
    results: convertedMovies(safeGet(res.data.results, []))
  }
  return convertedMovieListData
}

export async function searchMovieById(
  movieId: number
): Promise<ConvertedMovieDetail> {
  const res = await axios.get(`${BASE_URL}/movie/${movieId}`, {
    params: { api_key: API_KEY, language: 'zh-TW' }
  })
  const genre_ids = safeGet(res.data.genres, []).map(
    (genre: { id: number; name: string }) => safeGet(genre.id, -1)
  )
  const convertedMovieData = convertedMovie({
    ...res.data,
    genre_ids
  })
  return convertedMovieData
}

export async function getMovieDetail(
  movieId: number
): Promise<MovieDetailResponse> {
  const res = await axios.get(`${BASE_URL}/movie/${movieId}`, {
    params: {
      api_key: API_KEY,
      language: 'zh-TW',
      append_to_response: 'credits,videos,reviews'
    }
  })
  return convertedMovieDetail(res.data)
}
