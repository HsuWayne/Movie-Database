import { useEffect, useState } from 'react'
import { Modal, Image, Spin, Row, Col } from 'antd'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import type { MovieDetailResponse } from '../../types/models'
import placeholderImg from '/assets/No_Image.svg'
import { getMovieDetail } from '../../api/tmdb'
import { useWatchList } from '../../contexts/WatchListContext/WatchListContext'
import { useMessageContext } from '../../contexts/MessageContext/MessageContext'
import { getMovieDetailCache, setMovieDetailCache } from '../../utils/cache'

interface ModalProps {
  modalVisible: boolean
  closeModal: () => void
  selectedMovieId: number | null
}

export default function MovieDetailModal(props: ModalProps) {
  const { isWatchList, toggleWatchList } = useWatchList()
  const { error } = useMessageContext()
  const [loading, setLoading] = useState(false)
  const [detail, setDetail] = useState<MovieDetailResponse>()

  useEffect(() => {
    if (!props.selectedMovieId) return
    const cached = getMovieDetailCache(props.selectedMovieId)
    if (cached) {
      setDetail(cached)
      return
    }
    setLoading(true)
    getMovieDetail(props.selectedMovieId)
      .then((data) => {
        setDetail(data)
        setMovieDetailCache(props.selectedMovieId!, data)
      })
      .catch((err) => {
        console.error(err)
        error('讀取資料失敗, 請稍後再試')
      })
      .finally(() => setLoading(false))
  }, [props.selectedMovieId])

  const posterUrl = detail?.poster_path
    ? `https://image.tmdb.org/t/p/w500${detail.poster_path}`
    : placeholderImg

  const director = detail?.credits?.crew.find((c) => c.job === 'Director')

  const topCast = detail?.credits?.cast.slice(0, 5) || []

  const trailer = detail?.videos?.results.find(
    (v) => v.site === 'YouTube' && v.type === 'Trailer'
  )

  const topReviews = detail?.reviews?.results.slice(0, 2) || []

  return (
    <Modal
      open={props.modalVisible}
      onCancel={props.closeModal}
      footer={null}
      width={900}
      className='movie-detail-modal'
    >
      {loading || !detail ? (
        <div className='spin'>
          <Spin size='large' />
        </div>
      ) : (
        <>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Image alt={detail.title} src={posterUrl} />
            </Col>
            <Col xs={24} md={12}>
              <h2>{detail.title}</h2>
              <p>原文名稱: {detail.original_title}</p>
              <p>語言: {detail.original_language}</p>
              <p>片長: {detail.runtime} 分鐘</p>
              <p>導演: {director?.name || '未知'}</p>
              <p>
                演員:{' '}
                {topCast.length > 0
                  ? topCast.map((actor) => actor.name).join('、')
                  : '無資料'}
              </p>
              <p>{detail.overview}</p>
              {topReviews.length > 0 && (
                <div className='review'>
                  <h3>評論</h3>
                  {topReviews.map((review) => (
                    <div key={review.id} className='review-content'>
                      <p>
                        <b>{review.author}</b>（評分:{' '}
                        {review.author_details?.rating ?? '無'}）
                      </p>
                      <p>{review.content.slice(0, 200)}...</p>
                    </div>
                  ))}
                </div>
              )}
            </Col>
          </Row>
          {trailer && (
            <div className='trailer'>
              <h3>預告片</h3>
              <iframe
                width='100%'
                height='315'
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title='YouTube trailer'
                allowFullScreen
              />
            </div>
          )}
          {props.selectedMovieId && isWatchList(props.selectedMovieId) ? (
            <HeartFilled
              className='collect-icon collected'
              onClick={(e) => {
                e.stopPropagation()
                if (props.selectedMovieId !== null) {
                  toggleWatchList(props.selectedMovieId)
                }
              }}
            />
          ) : (
            <HeartOutlined
              className='collect-icon'
              onClick={(e) => {
                e.stopPropagation()
                if (props.selectedMovieId !== null) {
                  toggleWatchList(props.selectedMovieId)
                }
              }}
            />
          )}
        </>
      )}
    </Modal>
  )
}
