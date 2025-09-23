import { Card, Image, Skeleton } from 'antd'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import type { ConvertedMovieDetail } from '../types/models'
import placeholderImg from '/assets/No_Image.svg'
import { useWatchList } from '../contexts/WatchListContext/WatchListContext'

interface MovieCardProps {
  movie: ConvertedMovieDetail
  openModal: CallableFunction
}

export default function MovieCard(props: MovieCardProps) {
  const { isWatchList, toggleWatchList } = useWatchList()

  const posterUrl = props.movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`
    : placeholderImg

  return (
    <Card
      hoverable
      cover={
        <div className='movie-card'>
          <Image
            alt={props.movie.title}
            src={posterUrl}
            placeholder={<Skeleton.Image className='skeleton-image' active />}
            preview={false}
            className='poster-image'
          />
        </div>
      }
      onClick={() => props.openModal(props.movie.id)}
      actions={[
        isWatchList(props.movie.id) ? (
          <HeartFilled
            className='collect-icon collected'
            onClick={(e) => {
              e.stopPropagation()
              toggleWatchList(props.movie.id)
            }}
          />
        ) : (
          <HeartOutlined
            className='collect-icon'
            onClick={(e) => {
              e.stopPropagation()
              toggleWatchList(props.movie.id)
            }}
          />
        )
      ]}
    >
      <Card.Meta
        title={props.movie.title}
        description={
          <>
            <p>上映日期: {props.movie.release_date}</p>
            <p>
              評分: {props.movie.vote_average} / {props.movie.vote_count}票
            </p>
            <p>類型: {props.movie.genre_ids.join(', ')}</p>
          </>
        }
      />
    </Card>
  )
}
