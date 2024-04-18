import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';
import Podcasts from './Podcasts/Podcasts';
import Podcast from './Podcast/Podcast';
import Episode from './Episode/Episode';
import { store } from './store/store';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<Podcasts />} />
          <Route path='/podcast/:podcastId' element={<Podcast />} />
          <Route
            path='/podcast/:podcastId/episode/:episodeId'
            element={<Episode />}
          />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
