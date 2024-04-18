import Episode  from "./Episode"

export default interface PodcastDetail {
    id: number,
    collectionName: string,
    artistName: string,
    artworkUrl600: string
    episodes: {
        description: string
        list: Episode[]
    }
}