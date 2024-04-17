import { Link } from "react-router-dom";
import styles from './Header.module.css';

export default function Header() {
    return (
      <header className={`${styles.header}`}>
        <Link to='/'>
          <h1>Podcaster</h1>
        </Link>
        <img src='/public/spinner.png' alt='loader' />     
      </header>
    );
}