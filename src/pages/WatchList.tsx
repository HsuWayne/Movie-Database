import { useEffect, useState, useMemo, useRef } from 'react'
import { Row, Col, Spin, Empty, FloatButton, Button } from 'antd'
import { FrownOutlined } from '@ant-design/icons'
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
  const movieRefs = useRef<Record<number, HTMLDivElement | null>>({})
  const lotteryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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

  const runLottery = () => {
    if (movieList.length <= 1) return

    const rounds = 8
    let currentIndex = 0
    let delay = 200
    const delayIncrement = 100

    const randomIndices: number[] = []
    for (let i = 0; i < rounds; i++) {
      let nextIndex: number
      do {
        nextIndex = Math.floor(Math.random() * movieList.length)
      } while (i > 0 && nextIndex === randomIndices[i - 1])
      randomIndices.push(nextIndex)
    }

    const nextHighlight = () => {
      if (currentIndex > 0) {
        const prevId = movieList[randomIndices[currentIndex - 1]].id
        const prevEl = movieRefs.current[prevId]
        prevEl?.classList.remove('lottery-highlight')
      }
      if (currentIndex < rounds) {
        const id = movieList[randomIndices[currentIndex]].id
        const el = movieRefs.current[id]
        if (el) {
          el.classList.add('lottery-highlight')
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
        currentIndex++
        lotteryTimerRef.current = setTimeout(nextHighlight, delay)
        delay += delayIncrement
      } else {
        const finalId = movieList[randomIndices[rounds - 1]].id
        openModal(finalId)
        lotteryTimerRef.current = null
      }
    }

    nextHighlight()
  }

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
      <Row gutter={[16, 16]} className='header'>
        <Col xs={24} lg={12}>
          <h1 className='title'>我的待看清單</h1>
        </Col>
        <Col xs={24} md={12} lg={6} className='col-right-center'>
          <SortSelect
            value={sortBy}
            onChange={(v) => setSortBy(v)}
            className='select'
          />
        </Col>
        <Col xs={24} md={12} lg={6} className='col-right-center'>
          <Button
            onClick={runLottery}
            icon={<FrownOutlined />}
            className='button'
            disabled={movieList.length <= 1}
          >
            無法決定要看什麼嗎?
          </Button>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        {sortedMovies.map((movie) => (
          <Col key={movie.id} sm={24} md={12} lg={6}>
            <div
              ref={(el) => {
                movieRefs.current[movie.id] = el ?? null
              }}
            >
              <MovieCard movie={movie} openModal={openModal} />
            </div>
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
