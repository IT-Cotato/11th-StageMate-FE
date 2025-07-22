import '@/App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import MainPage from './pages/MainPage';
import ArchivePage from './pages/ArchivePage';

import SettingsPage from './pages/SettingsPage';
import SignupFormPage from './pages/auth/SignupFormPage';
import LoginPage from './pages/auth/LoginPage';
import SignupConditionPage from './pages/auth/SignupConditionPage';
import SignupCompletePage from './pages/auth/SignupCompletePage';
import CommunityMainLayout from './layout/CommunityMainLayout';
import CommunityMainPage from './pages/community/CommunityMainPage';
import FilteredPostList from './components/community/post/FilteredPostList';
import CommunityEditPage from './pages/community/CommunityEditPage';
import CommunityHeaderOnlyLayout from './layout/CommunityHeaderOnlyLayout';
import MagazinePage from './pages/community/MagazinePage';
import MagazineDetailPage from './pages/community/MagazineDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* NavigationBar가 필요한 페이지 */}
        <Route element={<MainLayout />}>
          <Route path='/' element={<MainPage />} />
          <Route path='/archive' element={<ArchivePage />} />
          <Route element={<CommunityMainLayout />}>
            <Route path='/community' element={<CommunityMainPage />} />
            <Route path='/community/:category' element={<FilteredPostList />} />
            <Route path='/magazine' element={<MagazinePage />} />
          </Route>
          <Route
            path='/magazine/:magazineId'
            element={<MagazineDetailPage />}
          />
          <Route path='/settings' element={<SettingsPage />} />
        </Route>

        {/* NavigationBar가 없어야하는 페이지 */}
        <Route path='/signup-form' element={<SignupFormPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup-condition' element={<SignupConditionPage />} />
        <Route path='/signup-complete' element={<SignupCompletePage />} />
        <Route element={<CommunityHeaderOnlyLayout />}>
          <Route path='/community/write' element={<CommunityEditPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
