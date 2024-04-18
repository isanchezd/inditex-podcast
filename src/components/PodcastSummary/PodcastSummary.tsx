import { Link } from 'react-router-dom'

import styles from './PodcastSummary.module.css'
import Podcast  from '../../domain/Podcast';

interface PodcastSummaryProps extends Podcast {}

export default function PodcastSummary({
  id,
  title,
  author,
  image,
  episodes,
}: PodcastSummaryProps) {
  return (
    <div className={`detailContainer`}>
      <div className={`${styles.detailPodcast}`}>
        <Link to={`/podcast/${id}`}>
          <div className={`${styles.detailImage}`}>
            <img src={image} alt={`${title} logo`} />
          </div>

          <p className={`${styles.detailPodcastTitle}`}>{title}</p>
        </Link>
        <p className={`${styles.detailPodcastDescription}`}>
          by: <i> {author}</i>
        </p>

        <p className={`${styles.detailPodcastTitle}`}>Description:</p>
        <p
          className={`${styles.detailPodcastDescription}`}
          dangerouslySetInnerHTML={{
            __html: episodes?.description
              .replace('<![CDATA[', '')
              .replace(']]>', ''),
          }}
        />
      </div>
    </div>
  );
}