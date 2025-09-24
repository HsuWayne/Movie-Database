import { useState, useEffect, useCallback } from 'react'
import * as api from '../api/tmdb'
import type { ConvertedMovieDetail } from '../types/models'
import { MovieFilterType } from '../types/variables'
import { Radio, Row, Col, Spin, FloatButton, Input } from 'antd'
import { useMessageContext } from '../contexts/MessageContext/MessageContext'
import MovieDetailModal from './modal/MovieDetailModal'
import MovieCard from '../components/MovieCard'

export default function Home() {
  const { Search } = Input
  const { error } = useMessageContext()
  const [movieList, setMovieList] = useState<ConvertedMovieDetail[]>([])
  const [movieFilterType, setMovieFilterType] = useState<MovieFilterType>(
    MovieFilterType.NOW_PLAYING
  )
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [targetEl, setTargetEl] = useState<HTMLElement | null>(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null)
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    setMovieList([])
    setPage(1)
    setHasMore(true)

    if (movieFilterType !== MovieFilterType.SEARCH) {
      setSearchQuery('')
      loadMovies(1, true, true)
    }
  }, [movieFilterType])

  useEffect(() => {
    if (movieFilterType === MovieFilterType.SEARCH) {
      setMovieList([])
      setPage(1)
      setHasMore(true)
      if (searchQuery) loadMovies(1, true, true)
    }
  }, [searchQuery])

  const loadMovies = useCallback(
    async (pageNumber: number, replace = false, currentHasMore = hasMore) => {
      if (loading || !currentHasMore) return
      setLoading(true)
      try {
        let res
        if (movieFilterType === MovieFilterType.SEARCH) {
          if (!searchQuery) {
            setLoading(false)
            return
          }
          res = await api.searchMovies(searchQuery, String(pageNumber))
        } else {
          res = await api.getMovieList(movieFilterType, String(pageNumber))
        }

        setMovieList((prev) => {
          const combined = replace ? res.results : [...prev, ...res.results]
          return Array.from(new Map(combined.map((m) => [m.id, m])).values())
        })
        setPage(pageNumber + 1)
        if (pageNumber >= res.total_pages) setHasMore(false)
      } catch (err) {
        console.error(err)
        error('讀取資料失敗, 請稍後再試')
      } finally {
        setLoading(false)
      }
    },
    [loading, hasMore, movieFilterType, searchQuery]
  )

  useEffect(() => {
    const contentEl = document.getElementById('main-content')
    if (!contentEl) return
    if (!targetEl) setTargetEl(contentEl)
    const handleScroll = () => {
      const scrollTop = contentEl.scrollTop
      const clientHeight = contentEl.clientHeight
      const scrollHeight = contentEl.scrollHeight
      if (scrollTop + clientHeight >= scrollHeight - 200) {
        loadMovies(page)
      }
    }
    contentEl.addEventListener('scroll', handleScroll)
    return () => contentEl.removeEventListener('scroll', handleScroll)
  }, [loadMovies, page, targetEl])

  const openModal = (movieId: number) => {
    setSelectedMovieId(movieId)
    setModalVisible(true)
  }

  const closeModal = () => {
    setSelectedMovieId(null)
    setModalVisible(false)
  }

  return (
    <div className='home-page'>
      <Row gutter={[16, 16]} align='middle' className='header'>
        <Col xs={24}>
          <h1 className='title'>電影列表</h1>
        </Col>
        <Col xs={24} md={16}>
          <Radio.Group
            value={movieFilterType}
            onChange={(e) => setMovieFilterType(e.target.value)}
            className='movie-type-option'
          >
            <Radio.Button value={MovieFilterType.NOW_PLAYING}>
              現正上映
            </Radio.Button>
            <Radio.Button value={MovieFilterType.POPULAR}>
              熱門電影
            </Radio.Button>
            <Radio.Button value={MovieFilterType.TOP_RATED}>
              高分電影
            </Radio.Button>
            <Radio.Button value={MovieFilterType.SEARCH}>搜尋電影</Radio.Button>
          </Radio.Group>
        </Col>
        {movieFilterType === MovieFilterType.SEARCH && (
          <Col xs={24} md={8}>
            <Search
              placeholder='請輸入關鍵字'
              enterButton='搜尋'
              onSearch={(value) => setSearchQuery(value)}
              className='search'
              allowClear
            />
          </Col>
        )}
      </Row>
      <Row gutter={[16, 16]}>
        {movieList.map((movie) => (
          <Col key={movie.id} sm={24} md={12} lg={6}>
            <MovieCard movie={movie} openModal={openModal} />
          </Col>
        ))}
      </Row>
      {loading && (
        <div className='spin'>
          <Spin />
        </div>
      )}
      {!hasMore && <div className='last-page'>已經到最後一頁</div>}
      {targetEl && (
        <FloatButton.BackTop target={() => targetEl} className='float-button' />
      )}
      <MovieDetailModal
        modalVisible={modalVisible}
        closeModal={closeModal}
        selectedMovieId={selectedMovieId}
      />
    </div>
  )
}
