import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Podcasts from './Podcasts/Podcasts';
import Podcast from './Podcast/Podcast';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Podcasts />} />
        <Route path='/podcast/:podcastId' element={<Podcast />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
