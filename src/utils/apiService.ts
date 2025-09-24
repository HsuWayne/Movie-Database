import type {
  ConvertedMovieDetail,
  MovieDetailResponse,
  MovieDetail
} from '../types/models'
import { getLanguageName, getGenreNames } from './convertMovieDetail'

export function safeGet<T>(value: unknown, fallback: T): T {
  return (value as T) ?? fallback
}

export function convertedMovie(
  raw: Partial<MovieDetail>
): ConvertedMovieDetail {
  return {
    id: safeGet<number>(raw.id, -1),
    title: safeGet<string>(raw.title, '無標題'),
    original_language: getLanguageName(
      safeGet<string>(raw.original_language, '')
    ),
    original_title: safeGet<string>(raw.original_title, ''),
    overview: safeGet<string>(raw.overview, '暫無簡介'),
    poster_path: safeGet<string>(raw.poster_path, ''),
    backdrop_path: safeGet<string>(raw.backdrop_path, ''),
    release_date: safeGet<string>(raw.release_date, '0000-00-00'),
    vote_average: safeGet<number>(raw.vote_average, 0),
    vote_count: safeGet<number>(raw.vote_count, 0),
    popularity: safeGet<number>(raw.popularity, 0),
    video: safeGet<boolean>(raw.video, false),
    adult: safeGet<boolean>(raw.adult, false),
    genre_ids: getGenreNames(safeGet<number[]>(raw.genre_ids, []))
  }
}

export function convertedMovies(
  movieList: MovieDetail[]
): ConvertedMovieDetail[] {
  return Array.isArray(movieList) ? movieList.map(convertedMovie) : []
}

export function convertedMovieDetail(
  raw: MovieDetailResponse
): MovieDetailResponse {
  return {
    id: safeGet<number>(raw.id, -1),
    title: safeGet<string>(raw.title, '無標題'),
    original_language: getLanguageName(
      safeGet<string>(raw.original_language, '')
    ),
    original_title: safeGet<string>(raw.original_title, ''),
    overview: safeGet<string>(raw.overview, '暫無簡介'),
    poster_path: safeGet<string>(raw.poster_path, ''),
    backdrop_path: safeGet<string>(raw.backdrop_path, ''),
    release_date: safeGet<string>(raw.release_date, '0000-00-00'),
    vote_average: safeGet<number>(raw.vote_average, 0),
    vote_count: safeGet<number>(raw.vote_count, 0),
    popularity: safeGet<number>(raw.popularity, 0),
    video: safeGet<boolean>(raw.video, false),
    adult: safeGet<boolean>(raw.adult, false),
    genre_ids: safeGet<number[]>(raw.genre_ids, []),
    runtime: safeGet<number>(raw.runtime, 0),
    credits: {
      cast: safeGet(raw.credits?.cast, []),
      crew: safeGet(raw.credits?.crew, [])
    },
    videos: {
      results: safeGet(raw.videos?.results, [])
    },
    reviews: {
      page: safeGet(raw.reviews?.page, 1),
      results: safeGet(raw.reviews?.results, []),
      total_pages: safeGet(raw.reviews?.total_pages, 0),
      total_results: safeGet(raw.reviews?.total_results, 0)
    }
  }
}
