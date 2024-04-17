import { Link } from 'react-router-dom'

import styles from './PodcastCard.module.css'

interface PodcastCardProps {
  id: string;
  title: string;
  author: string;
  image: string;
}

export default function PodcastCard ({ id, title, author, image }: PodcastCardProps) {
  return (
    <Link style={{ textDecoration: 'none' }} to={`podcast/${id}`}>
      <div className={`${styles.podcastCard}`}>
        <img
          className={`${styles.podcastCardImage}`}
          src={image}
          alt={`${title} logo`}
        />
        <p className={`${styles.podcastCardTitle}`}>{title.toUpperCase()}</p>
        <p className={`${styles.podcastCardAuthor}`}>Author: {author} </p>
      </div>
    </Link>
  );
}