import { getApiUrl } from "../config/config"
import Episode from "../domain/Episode"
import EpisodeDetail from "../domain/EpisodeDetail"

export async function getAllPodcasts() {
    const endpoint = `${getApiUrl()}/us/rss/toppodcasts/limit=100/genre=1310/json`
    const res = await fetch(endpoint)
    const data = await res.json()

    return data
}

export async function getPodcastById(id: number) {
    const endpoint = `${getApiUrl()}/lookup?id=${id}`
    const allowOriginsUrl = `https://api.allorigins.win/get?charset=ISO-8859-1&url=${endpoint}`

    try {
        const response = await fetch(allowOriginsUrl);
        const data = await response.json();
        const parsedContent = JSON.parse(data.contents);

        const episodes = await getPodcastFeed(parsedContent.results[0].feedUrl);

        const enrichedData = {
            podcastInfo: parsedContent.results[0],
            lastUpdated: new Date(),
        };
        enrichedData.podcastInfo.episodes = episodes;
        return enrichedData;
    } catch (error) {
        console.error('Error fetching podcast data:', error);
        throw error;  
    }

}

async function getPodcastFeed(feed: string) {
    try {
        const response = await fetch(feed);
        const text = await response.text()

        const parsedData: XMLDocument = new window.DOMParser().parseFromString(
            text,
            'text/xml'
        );

        if (!parsedData) {
            throw new Error('Data could not be retrieved from the API');
        }

        const formattedData = extractEpisodesData(parsedData);

        return formattedData;
    } catch (error) {
        console.error('Error fetching and parsing data:', error);
        throw error;
    }
}

const extractEpisodesData = (episodes: XMLDocument) => {
    const formattedEpisodes: EpisodeDetail = {
        description: '',
        list: [],
    };

    const items = episodes.querySelectorAll('item');
    const descriptionNodes = episodes.getElementsByTagName('itunes:summary').length > 0
        ? episodes.getElementsByTagName('itunes:summary')
        : episodes.getElementsByTagName('description');
    formattedEpisodes.description = descriptionNodes[0]?.innerHTML || '';

    items.forEach((element: Element) => {
        const idNode = element.getElementsByTagName('omny:clipId')[0] ||
            element.getElementsByTagName('guid')[0];
        const id = idNode ? idNode.innerHTML.replace('<![CDATA[', '').replace(']]>', '') : '';

        const episode: Episode = {
            id: id,
            title: (element.getElementsByTagName('itunes:title')[0]?.innerHTML ||
                element.getElementsByTagName('title')[0].innerHTML).replace('<![CDATA[', '').replace(']]>', ''),
            date: element.getElementsByTagName('pubDate')[0]?.innerHTML || '',
            duration: element.getElementsByTagName('itunes:duration')[0]?.innerHTML || '',
            description: element.getElementsByTagName('description')[0]?.innerHTML || '',
            audio: element.getElementsByTagName('enclosure')[0]?.getAttribute('url') || undefined,
        };

        formattedEpisodes.list.push(episode);
    });

    return formattedEpisodes;
}
