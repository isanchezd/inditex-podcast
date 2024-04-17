import { useParams } from "react-router-dom";
import PodcastDetail from "../domain/PodcastDetail";
import { useEffect, useState } from "react";
import styles from './Podcast.module.css';
import Layout from "../components/Layout/Layout";
import { getPodcastById } from "../repositories/podcastsHttpRepository";

export default function Podcast() {
    const { podcastId } = useParams();
    const id = Number(podcastId);
    const [isLoading, setIsLoading] = useState(true);
    const [podcastInfo, setPodcastInfo] = useState<PodcastDetail | null>(null);
    const [error, setError] = useState(false)

    const fetchPodcast = async () => {
      try {
        const data = await getPodcastById(id);
        setPodcastInfo(data.podcastInfo);
      } catch (error) {
        console.error(error); 
        setError(true);
      } finally {
        setIsLoading(false)
      }
    };

    useEffect(() => {
        setIsLoading(true)
        fetchPodcast(); 
    }, [id])


    return error ? (
        <Layout>
            <p className={`${styles.error}`}>
                There's been an error loading this podcast. Please, check console for
                more information.
            </p>
        </Layout>
    ) : (
        isLoading ? 
        <Layout>
            <h1>Podcast</h1>
        </Layout> : null
    )
}