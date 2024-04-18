import React from 'react'
import { Link } from 'react-router-dom'
import PodcastSummary from '../../../components/PodcastSummary/PodcastSummary'
import Podcast  from '../../../domain/Podcast'
import styles from './PodcastDetail.module.css';


interface PodcastDetailProps extends Podcast {}

export default function PodcastDetailInfo({
  id,
  title,
  author,
  image,
  episodes,
}: PodcastDetailProps) {
  return episodes ? (
    <div className="detailContainer">
      <PodcastSummary
        id={id}
        title={title}
        author={author}
        image={image}
        episodes={episodes}
      />
      <div className={`${styles.detailEpisodes}`}>
        <p className={`${styles.detailEpisodesNumber}`}>
          Episodes: {episodes?.list.length}
        </p>

        <div className={`${styles.detailEpisodesList}`}>
          <h3>Title</h3>
          <h3>Date</h3>
          <h3>Duration</h3>
          {episodes?.list.map((episode, index) => (
            <React.Fragment key={index}>
              <Link to={`./episode/${episode.id}`}>
                <span className={`${styles.detailEpisodesTitle}`}>
                  {episode.title.replace('<![CDATA[', '').replace(']]>', '')}
                </span>
              </Link>
              <p>{new Date(episode.date).toLocaleDateString('es')}</p>
              <p>{episode.duration}</p>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <p className={`${styles.loading}`}>Page is loading...</p>
  );
}