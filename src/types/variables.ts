export const MovieFilterType = {
  NOW_PLAYING: 'now_playing',
  POPULAR: 'popular',
  TOP_RATED: 'top_rated',
  SEARCH: 'search'
}

export type MovieFilterType =
  (typeof MovieFilterType)[keyof typeof MovieFilterType]

export const BASE_URL = 'https://api.themoviedb.org/3'
