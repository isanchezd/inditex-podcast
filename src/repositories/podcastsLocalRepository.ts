import Feed from "../domain/Feed";

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