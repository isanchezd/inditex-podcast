export default interface FeedEntry {
    id: {
        attributes: {
            'im:id': string
        }
    },
    'im:name': {
        label: string;
    },
    'im:artist': {
        label: string;
    },
    'im:image': [{ label: string }]
}