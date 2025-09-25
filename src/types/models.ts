export interface MovieListResponse {
  dates?: { maximum: string; minimum: string }
  page: number
  results: ConvertedMovieDetail[]
  total_pages: number
  total_results: number
}

export interface MovieDetail {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface ConvertedMovieDetail extends Omit<MovieDetail, 'genre_ids'> {
  genre_ids: string[]
}

export interface Cast {
  cast_id: number
  character: string
  credit_id: string
  gender: number
  id: number
  name: string
  order: number
  profile_path: string | null
}

export interface Crew {
  credit_id: string
  department: string
  gender: number
  id: number
  job: string
  name: string
  profile_path: string | null
}

export interface Credits {
  cast: Cast[]
  crew: Crew[]
}

export interface Video {
  id: string
  key: string
  name: string
  site: string
  size: number
  type: string
}

export interface Videos {
  results: Video[]
}

export interface ReviewAuthorDetails {
  name: string
  username: string
  avatar_path: string | null
  rating: number | null
}

export interface Review {
  id: string
  author: string
  author_details: ReviewAuthorDetails
  content: string
  created_at: string
  url: string
}

export interface Reviews {
  page: number
  results: Review[]
  total_pages: number
  total_results: number
}

export interface MovieDetailResponse extends MovieDetail {
  runtime: number
  credits: Credits
  videos: Videos
  reviews: Reviews
}
