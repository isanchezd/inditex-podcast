import { getApiUrl } from "../config/config"

export async function getAllPodcasts() {
    const endpoint = `${getApiUrl()}/us/rss/toppodcasts/limit=100/genre=1310/json`
    const res = await fetch(endpoint)
    const data = await res.json()

    return data
}
