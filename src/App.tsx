import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Podcasts from './Podcasts/Podcasts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Podcasts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
