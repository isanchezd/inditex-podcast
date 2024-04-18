import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import EpisodeDetail from './components/EpisodeDetail/EpisodeDetail';
import PodcastDetailInfo from '../domain/PodcastDetail';

import {default as EpisodeModel} from '../domain/Episode';
import { getPodcast } from '../repositories/podcastsLocalRepository';

export default function Episode() {
  const { podcastId, episodeId } = useParams();
  const id = Number(podcastId);

  const [episodeInfo, setEpisodeInfo] = useState<EpisodeModel>(
    {} as EpisodeModel
  );
  const [podcastInfo, setPodcastInfo] = useState<PodcastDetailInfo>(
    {} as PodcastDetailInfo
  );

  useEffect(() => {
    const localPodcastInfo = getPodcast(id);
    const findItem = localPodcastInfo.podcastInfo.episodes.list.find(
      (episode: EpisodeModel) => episode.id === episodeId
    );

    setEpisodeInfo(findItem);
    setPodcastInfo(localPodcastInfo.podcastInfo);
  }, [episodeId, podcastId]);

  return (
    <Layout>
      {
        <div className='detailContainer'>
          <EpisodeDetail
            id={Number(podcastId)}
            title={podcastInfo.collectionName}
            author={podcastInfo.artistName}
            image={podcastInfo.artworkUrl600}
            episodes={podcastInfo.episodes}
            episodeInfo={episodeInfo}
          />
        </div>
      }
    </Layout>
  );
}
