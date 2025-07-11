import '@/App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import MainPage from './pages/MainPage';
import ArchivePage from './pages/ArchivePage';
import CommunityPage from './pages/CommunityPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<MainPage />} />
          <Route path='/archive' element={<ArchivePage />} />
          <Route path='/community' element={<CommunityPage />} />
          <Route path='/settings' element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
