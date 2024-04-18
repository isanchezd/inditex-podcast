import { Link } from "react-router-dom";
import styles from './Header.module.css';
import { useSelector } from 'react-redux';
import { LoadingState } from "../../store/loadingSlice";


export default function Header() {
    const isLoading = useSelector(
      (state: { loading: LoadingState }) => state.loading.isLoading
    );

    return (
      <header className={`${styles.header}`}>
        <Link to='/'>
          <h1>Podcaster</h1>
        </Link>
        {isLoading ? <img src='/public/spinner.png' alt='loader' /> : null}
      </header>
    );
}


