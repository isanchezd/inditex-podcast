import { ChangeEvent, useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { getAllPodcasts as getAllPodcastLocal } from '../repositories/podcastsLocalRepository';
import { getAllPodcasts } from '../repositories/podcastsHttpRepository';
import SearchInput from './components/Search/Search';
import PodcastCard from './components/PodcastCard/PodcastCard';
import FeedEntry from '../domain/FeedEntry';
import styles from './Podcast.module.css';
import { getLastUpdated } from '../repositories/podcastsLocalRepository';
import { defaultDate, isMajorThan1Day } from '../utils/utils';
import { LoadingState, setLoadingFalse, setLoadingTrue } from '../store/loadingSlice';
import { useSelector, useDispatch } from 'react-redux';


export default function Podcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const isLoading = useSelector(
    (state: { loading: LoadingState }) => state.loading.isLoading
  );
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const data = await getAllPodcasts();
      setPodcasts(data.feed.entry);
      setFilteredPodcasts(data.feed.entry);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoadingFalse());
    }
  };

  useEffect(() => {
    dispatch(setLoadingTrue());
    const lastTimeUpdated = getLastUpdated()
    const isFetchRequired = isMajorThan1Day(
      lastTimeUpdated || defaultDate.toString()
    );

    if (isFetchRequired) {
      fetchData();
    } else {
      const localPodcastsInfo = getAllPodcastLocal();
      setPodcasts(localPodcastsInfo);
      setFilteredPodcasts(localPodcastsInfo);
      dispatch(setLoadingFalse());
    }
    fetchData();
  }, []);

  function onHandleInput(event: ChangeEvent<HTMLInputElement>): void {
    const filteredPodcasts = podcasts.filter(
      (feedentry: FeedEntry) =>
        feedentry['im:name'].label
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        feedentry['im:artist'].label
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
    );
    setFilteredPodcasts(filteredPodcasts);
  }

  return (
    <Layout>
      {!isLoading ? (
        <>
          <div className={`${styles.podcastsSearch}`}>
            <p>{filteredPodcasts.length}</p>
            <SearchInput handleInput={onHandleInput} />
          </div>
          <div className={`${styles.podcasts}`}>
            {filteredPodcasts.length > 0
              ? filteredPodcasts.map((podcast: FeedEntry) => (
                  <div key={podcast.id.attributes['im:id']}>
                    <PodcastCard
                      id={podcast.id.attributes['im:id']}
                      title={podcast['im:name'].label}
                      author={podcast['im:artist'].label}
                      image={podcast['im:image'][0].label}
                    />
                  </div>
                ))
              : null}
          </div>
        </>
      ) : null}
    </Layout>
  );
}
