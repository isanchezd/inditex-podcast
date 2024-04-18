import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Podcasts from './Podcasts/Podcasts';
import Podcast from './Podcast/Podcast';
import Episode from './Episode/Episode';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Podcasts />} />
        <Route path='/podcast/:podcastId' element={<Podcast />} />
        <Route
          path='/podcast/:podcastId/episode/:episodeId'
          element={<Episode />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
