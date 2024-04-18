import Feed from "../domain/Feed";
import Podcast from "../domain/Podcast";

export function savePodcasts(data: Feed) {
    const today = new Date();
    localStorage.setItem('podcasts_lastUpdated', today.toString());
    localStorage.setItem('podcasts', JSON.stringify(data.feed.entry));
}

export function getAllPodcasts() {
    const localPodcastsInfo = JSON.parse(
        localStorage.getItem('podcasts') || '{}'
    );
    return localPodcastsInfo
}

export function getLastUpdated() {
    return localStorage.getItem('podcasts_lastUpdated');
}

export function savePodcast(id: number, podcast: {
    podcastInfo: Podcast;
    lastUpdated: Date;
}) {
    localStorage.setItem(`podcast_${id}`, JSON.stringify(podcast));
}

export function getPodcast(id: number) {
    const localPodcastInfo = JSON.parse(
        localStorage.getItem(`podcast_${id}`) || '{}'
    );

    return localPodcastInfo
}
