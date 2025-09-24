// 成功回傳 - getMovieList / searchMovies
export const mockMovieListSuccess = {
  data: {
    page: 1,
    total_pages: 10,
    total_results: 100,
    results: [
      {
        id: 1,
        title: '測試電影',
        original_language: 'en',
        original_title: 'Test Movie',
        overview: '一部測試電影',
        poster_path: '/poster.jpg',
        backdrop_path: '/backdrop.jpg',
        release_date: '2025-01-01',
        vote_average: 8.5,
        vote_count: 100,
        popularity: 99,
        video: false,
        adult: false,
        genre_ids: [28, 12]
      }
    ]
  }
}

// 錯誤資料 - getMovieList / searchMovies
export const mockMovieListIncomplete = {
  data: {
    total_pages: null,
    total_results: undefined,
    results: {
      1: {
        id: 1,
        title: '測試電影',
        original_language: 'en',
        original_title: 'Test Movie',
        overview: '一部測試電影',
        poster_path: '/poster.jpg',
        backdrop_path: '/backdrop.jpg',
        release_date: '2025-01-01',
        vote_average: 8.5,
        vote_count: 100,
        popularity: 99,
        video: false,
        adult: false,
        genre_ids: [28, 12]
      }
    }
  }
}

// 成功回傳 - searchMovieById
export const mockSearchMovieByIdSuccess = {
  data: {
    id: 10,
    title: 'ID 查詢電影',
    original_language: 'ja',
    original_title: 'JP Title',
    overview: '描述',
    poster_path: '/jp.jpg',
    backdrop_path: '/jp_bg.jpg',
    release_date: '2025-02-02',
    vote_average: 7.2,
    vote_count: 50,
    popularity: 22,
    video: false,
    adult: false,
    genres: [{ id: 28, name: '動作' }]
  }
}

// 錯誤資料 - searchMovieById
export const mockSearchMovieByIdIncomplete = {
  data: {
    backdrop_path: null,
    release_date: undefined,
    genres: ['動作']
  }
}

// 成功回傳 - getMovieDetail
export const mockMovieDetailSuccess = {
  data: {
    id: 999,
    title: 'ID 查詢電影',
    original_language: 'ja',
    original_title: 'JP Title',
    overview: '描述',
    poster_path: '/jp.jpg',
    backdrop_path: '/jp_bg.jpg',
    release_date: '2025-02-02',
    vote_average: 7.2,
    vote_count: 50,
    popularity: 22,
    video: false,
    adult: false,
    genre_ids: [28, 12],
    runtime: 120,
    credits: {
      cast: [],
      crew: []
    },
    videos: {
      results: []
    },
    reviews: {
      page: 1,
      results: [],
      total_pages: 2,
      total_results: 40
    }
  }
}

// 錯誤資料 - getMovieDetail
export const mockMovieDetailIncomplete = {
  data: {
    id: undefined,
    popularity: null,
    reviews: [
      {
        page: 1,
        results: [],
        total_pages: 2,
        total_results: 40
      }
    ]
  }
}
