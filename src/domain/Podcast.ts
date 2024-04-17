import Episode from "./Episode"

export default interface Podcast {
    id: number,
    title: string,
    author: string, 
    image: string, 
    episodes: {
        description: string
        list: Episode[]
    }
}