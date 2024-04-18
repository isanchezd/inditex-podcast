import React from 'react';

import PodcastSummary from '../../../components/PodcastSummary/PodcastSummary';
import Podcast from '../../../domain/Podcast';
import Episode from '../../../domain/Episode';
import styles from './EpisodeDetail.module.css';


interface EpisodeDetailProps extends Podcast {
    episodeInfo: Episode
}

export default function EpisodeDetail({
  id,
  title,
  author,
  image,
  episodes,
  episodeInfo,
}: EpisodeDetailProps) {
  return (
    <>
      <PodcastSummary
        id={id}
        title={title}
        author={author}
        image={image}
        episodes={episodes}
      />
      <div className={`${styles.episodeContainer}`}>
        <h3 className={`${styles.title}`}>
          {episodeInfo?.title?.replace('<![CDATA[', '').replace(']]>', '')}
        </h3>
        {episodeInfo.description && (
          <p
            dangerouslySetInnerHTML={{
              __html: episodeInfo?.description
                .replace('<![CDATA[', '')
                .replace(']]>', ''),
            }}
          />
        )}
        <audio src={episodeInfo.audio} className={`${styles.player}`} controls>
          Your browser does not support the audio tag.
        </audio>
      </div>
    </>
  );
}