import { Card, Image, Skeleton } from 'antd'
import type { ConvertedMovieDetail } from '../types/models'
import placeholderImg from '/assets/No_Image.svg'

interface MovieCardProps {
  movie: ConvertedMovieDetail
  openModal: CallableFunction
}

export default function MovieCard(props: MovieCardProps) {
  const posterUrl = props.movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`
    : placeholderImg

  return (
    <Card
      hoverable
      cover={
        <div
          style={{
            width: '100%',
            aspectRatio: '2 / 3',
            overflow: 'hidden'
          }}
        >
          <Image
            alt={props.movie.title}
            src={posterUrl}
            placeholder={
              <Skeleton.Image
                style={{ width: '100%', height: '100%' }}
                active
              />
            }
            preview={false}
            onClick={() => props.openModal(props.movie.id)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              cursor: 'pointer'
            }}
          />
        </div>
      }
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
