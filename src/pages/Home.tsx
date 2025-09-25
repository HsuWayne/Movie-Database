import { useState, useEffect, useCallback } from 'react'
import * as api from '../api/tmdb'
import type { ConvertedMovieDetail } from '../types/models'
import { MovieFilterType } from '../types/variables'
import { Radio, Row, Col, Spin, FloatButton, Input, Tooltip } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { useMessageContext } from '../contexts/MessageContext/MessageContext'
import MovieDetailModal from './modal/MovieDetailModal'
import MovieCard from '../components/MovieCard'
import SortSelect from '../components/SortSelect'
import type { SortOption } from '../components/SortSelect'

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
  const [sortBy, setSortBy] = useState<SortOption>('release_desc')
  const [isStale, setIsStale] = useState(false)

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
        setIsStale(true)
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

  const applySort = (list: ConvertedMovieDetail[], sortOption: SortOption) => {
    switch (sortOption) {
      case 'release_desc':
        return list.sort(
          (a, b) =>
            new Date(b.release_date).getTime() -
            new Date(a.release_date).getTime()
        )
      case 'release_asc':
        return list.sort(
          (a, b) =>
            new Date(a.release_date).getTime() -
            new Date(b.release_date).getTime()
        )
      case 'rating_desc':
        return list.sort((a, b) => b.vote_average - a.vote_average)
      case 'rating_asc':
        return list.sort((a, b) => a.vote_average - b.vote_average)
      case 'title_asc':
        return list.sort((a, b) => a.title.localeCompare(b.title, 'zh'))
      case 'title_desc':
        return list.sort((a, b) => b.title.localeCompare(a.title, 'zh'))
      default:
        return list
    }
  }

  const handleSortChange = (option: SortOption) => {
    setSortBy(option)
    setMovieList((prev) => applySort(prev, option))
    setIsStale(false)
  }

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
        <Col xs={24} md={12}>
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
        <Col xs={24} md={6}>
          {movieFilterType === MovieFilterType.SEARCH && (
            <Search
              placeholder='請輸入關鍵字'
              enterButton='搜尋'
              onSearch={(value) => setSearchQuery(value)}
              className='search'
              allowClear
            />
          )}
        </Col>
        <Col xs={24} md={6} className='select-group'>
          <SortSelect
            value={sortBy}
            onChange={handleSortChange}
            className='select'
          />
          <Tooltip
            title={
              movieList.length > 0 && isStale
                ? '列表已變更，請點擊重新套用排序'
                : '排序僅依照目前已載入的列表'
            }
          >
            <InfoCircleOutlined
              className={`tooltip-icon ${
                movieList.length > 0 && isStale ? 'isStale' : ''
              }`}
              onClick={() => {
                if (isStale) handleSortChange(sortBy)
              }}
            />
          </Tooltip>
        </Col>
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
