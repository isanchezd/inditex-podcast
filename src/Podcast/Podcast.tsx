import { useParams } from "react-router-dom";
import PodcastDetail from "../domain/PodcastDetail";
import { useEffect, useState } from "react";
import styles from './Podcast.module.css';
import Layout from "../components/Layout/Layout";
import { getPodcastById } from "../repositories/podcastsHttpRepository";
import { default as PodcastDetailResume } from "./components/PodcastDetail/PodcastDetail";
import { getPodcast, savePodcast } from "../repositories/podcastsLocalRepository";
import { defaultDate, isMajorThan1Day } from "../utils/utils";

export default function Podcast() {
    const { podcastId } = useParams();
    const id = Number(podcastId);
    const [isLoading, setIsLoading] = useState(true);
    const [podcastInfo, setPodcastInfo] = useState<PodcastDetail | null>(null);
    const [error, setError] = useState(false)

    const fetchPodcast = async () => {
      try {
        const data = await getPodcastById(id);
        savePodcast(id, data);
        setPodcastInfo(data.podcastInfo);
      } catch (error) {
        console.error(error); 
        setError(true);
      } finally {
        setIsLoading(false)
      }
    };

    useEffect(() => {
        setIsLoading(true);
        setError(false);

        const localPodcastInfo = getPodcast(id);
        const isFetchRequired = isMajorThan1Day(
          localPodcastInfo?.lastUpdated
            ? localPodcastInfo?.lastUpdated
            : defaultDate
        );

        if (isFetchRequired) {
            fetchPodcast(); 
        } else {
            localPodcastInfo ?  setPodcastInfo(localPodcastInfo.podcastInfo) : setError(true)
            setIsLoading(false)
        }

    }, [id])


    return error ? (
      <Layout>
        <p className={`${styles.error}`}>
          There's been an error loading this podcast. Please, check console for
          more information.
        </p>
      </Layout>
    ) : !isLoading && podcastInfo ? (
      <Layout>
        <PodcastDetailResume
          id={id}
          title={podcastInfo.collectionName}
          author={podcastInfo.artistName}
          image={podcastInfo.artworkUrl600}
          episodes={podcastInfo.episodes}
        />
      </Layout>
    ) : null;
}