import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ListPage from './pages/ListPage';
import GalleryPage from './pages/GalleryPage';
import DetailPage from './pages/DetailPage';
import { PokemonProvider } from './context/PokemonContext';

function App() {
  return (
    <PokemonProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/pokemon/:id" element={<DetailPage />} />
      </Routes>
    </PokemonProvider>
  );
}

export default App;
