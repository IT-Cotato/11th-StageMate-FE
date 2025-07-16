import '@/App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import MainPage from './pages/MainPage';
import ArchivePage from './pages/ArchivePage';
import CommunityPage from './pages/CommunityPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/auth/LoginPage';
import SignupConditionPage from './pages/auth/SignupConditionPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* NavigationBar가 필요한 페이지 */}
        <Route element={<MainLayout />}>
          <Route path='/' element={<MainPage />} />
          <Route path='/archive' element={<ArchivePage />} />
          <Route path='/community' element={<CommunityPage />} />
          <Route path='/settings' element={<SettingsPage />} />
        </Route>

        {/* NavigationBar가 없어야하는 페이지 */}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup-condition' element={<SignupConditionPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
