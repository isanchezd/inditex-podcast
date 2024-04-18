export default interface Episode {
    id: string;
    title: string;
    date: string;
    duration: string;
    description: string;
    audio: string | undefined;
}