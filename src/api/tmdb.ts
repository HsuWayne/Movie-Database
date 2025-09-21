import axios from 'axios'
import type {
  MovieListResponse,
  ConvertedMovieDetail,
  MovieDetailResponse
} from '../types/models'
import { convertedMovies, getLanguageName } from '../utils/utils'
import { BASE_URL } from '../types/variables'

const API_KEY = import.meta.env.VITE_API_KEY

export async function getMovieList(
  type: string,
  page: string
): Promise<MovieListResponse> {
  const res = await axios.get(`${BASE_URL}/movie/${type}`, {
    params: { api_key: API_KEY, page, language: 'zh-TW' }
  })
  const convertedResults: ConvertedMovieDetail[] = convertedMovies(
    res.data.results
  )
  return {
    ...res.data,
    results: convertedResults
  }
}

export async function searchMovies(
  query: string,
  page: string
): Promise<MovieListResponse> {
  const res = await axios.get(`${BASE_URL}/search/movie`, {
    params: { api_key: API_KEY, query, page, language: 'zh-TW' }
  })
  const convertedResults: ConvertedMovieDetail[] = convertedMovies(
    res.data.results
  )
  return {
    ...res.data,
    results: convertedResults
  }
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
  const convertedLanguageName: string = getLanguageName(
    res.data.original_language
  )
  return { ...res.data, original_language: convertedLanguageName }
}
