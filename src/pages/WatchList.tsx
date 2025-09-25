import { useEffect, useState, useMemo } from 'react'
import { Row, Col, Spin, Empty, FloatButton } from 'antd'
import { useWatchList } from '../contexts/WatchListContext/WatchListContext'
import { useMessageContext } from '../contexts/MessageContext/MessageContext'
import { searchMovieById } from '../api/tmdb'
import type { ConvertedMovieDetail } from '../types/models'
import { getMovieCache, setMovieCache } from '../utils/cache'
import MovieDetailModal from './modal/MovieDetailModal'
import MovieCard from '../components/MovieCard'
import SortSelect from '../components/SortSelect'
import type { SortOption } from '../components/SortSelect'

export default function WatchList() {
  const { watchList } = useWatchList()
  const { error } = useMessageContext()
  const [movieList, setMovieList] = useState<ConvertedMovieDetail[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [targetEl, setTargetEl] = useState<HTMLElement | null>(null)
  const [sortBy, setSortBy] = useState<SortOption>('release_desc')

  useEffect(() => {
    if (watchList.length === 0) {
      setMovieList([])
      return
    }
    setLoading(true)

    Promise.all(
      watchList.map(async (id) => {
        const cached = getMovieCache(id)
        if (cached) return cached
        const data = await searchMovieById(id)
        setMovieCache(id, data)
        return data
      })
    )
      .then((res) => setMovieList(res))
      .catch((err) => {
        console.error(err)
        error('讀取資料失敗, 請稍後再試')
      })
      .finally(() => setLoading(false))
  }, [watchList])

  const sortedMovies = useMemo(() => {
    const list = [...movieList]
    switch (sortBy) {
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
  }, [movieList, sortBy])

  useEffect(() => {
    const contentEl = document.getElementById('main-content')
    if (!targetEl) setTargetEl(contentEl)
  }, [])

  const openModal = (movieId: number) => {
    setSelectedMovieId(movieId)
    setModalVisible(true)
  }

  const closeModal = () => {
    setSelectedMovieId(null)
    setModalVisible(false)
  }

  if (loading) {
    return (
      <div className='loading-icon'>
        <Spin size='large' />
      </div>
    )
  }

  if (movieList.length === 0) {
    return <Empty description='尚無收藏的電影' className='empty-icon' />
  }

  return (
    <div className='watch-list'>
      <div className='header'>
        <h1 className='title'>我的待看清單</h1>
        <SortSelect
          value={sortBy}
          onChange={(v) => setSortBy(v)}
          className='select'
        />
      </div>
      <Row gutter={[16, 16]}>
        {sortedMovies.map((movie) => (
          <Col key={movie.id} sm={24} md={12} lg={6}>
            <MovieCard movie={movie} openModal={openModal} />
          </Col>
        ))}
      </Row>
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
