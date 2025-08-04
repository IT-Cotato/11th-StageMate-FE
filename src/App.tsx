import '@/App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import MainPage from './pages/MainPage';
import ArchivePage from './pages/archive/ArchivePage';

import SettingsPage from './pages/SettingsPage';
import SignupFormPage from './pages/auth/SignupFormPage';
import LoginPage from './pages/auth/LoginPage';
import SignupConditionPage from './pages/auth/SignupConditionPage';
import SignupCompletePage from './pages/auth/SignupCompletePage';
import CommunityMainLayout from './layout/CommunityMainLayout';
import CommunityMainPage from './pages/community/CommunityMainPage';
import FilteredPostList from './components/community/post/FilteredPostList';
import CommunityEditPage from './pages/community/CommunityEditPage';
import ArchiveLayout from './layout/ArchiveLayout';
import CommunityHeaderOnlyLayout from './layout/CommunityHeaderOnlyLayout';
import CommunityPostPage from './pages/community/CommunityPostPage';
import CommunityContentLayout from './layout/CommunityContentLayout';
import MagazinePage from './pages/community/MagazinePage';
import MagazineDetailPage from './pages/community/MagazineDetailPage';
import ArchiveWritePage from './pages/archive/ArchiveWritePage';
import ScrappedPostList from './components/archive/ScrappedPostList';
import ScrappedMagazineList from './components/archive/ScrappedMagazineList';
import SearchPage from './pages/SearchPage';
import ChatRoomPage from './pages/community/ChatRoomPage';
import ChatPage from './pages/community/ChatPage';
import CalendarReportPage from './pages/calendar/CalendarReportPage';
import CalendarReportLocationPage from './pages/calendar/CalendarReportLocation';
import CalendarReportPerformancePage from './pages/calendar/CalendarReportPerformancePage';
import CalendarLayout from './layout/CalendarLayout';
import CalendarPage from './pages/calendar/CalendarPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* NavigationBar가 필요한 페이지 */}
        <Route element={<MainLayout />}>
          <Route path='/' element={<MainPage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route element={<ArchiveLayout />}>
            <Route path='archive'>
              <Route index element={<ArchivePage />} />
              <Route path='write' element={<ArchiveWritePage />} />
              <Route path=':id' element={<ArchiveWritePage />} />
              <Route path='scrap-magazine' element={<ScrappedMagazineList />} />
              <Route path='scrap-post' element={<ScrappedPostList />} />
            </Route>
            <Route path='/calendar' element={<CalendarPage />} />
          </Route>
          <Route element={<CalendarLayout />}>
            <Route path='/calendar/report' element={<CalendarReportPage />} />
            <Route
              path='/calendar/report/location'
              element={<CalendarReportLocationPage />}
            />
            <Route
              path='/calendar/report/performance'
              element={<CalendarReportPerformancePage />}
            />
          </Route>
          <Route element={<CommunityMainLayout />}>
            <Route path='/community' element={<CommunityMainPage />} />
            <Route path='/community/:category' element={<FilteredPostList />} />
            <Route path='/magazine' element={<MagazinePage />} />
            <Route path='/chat' element={<ChatPage />} />
            <Route path='/chatRoom/:id' element={<ChatRoomPage />} />
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
          <Route
            path='/community/:category/write'
            element={<CommunityEditPage />}
          />
        </Route>
        <Route element={<CommunityContentLayout />}>
          <Route
            path='/community/:category/:postId'
            element={<CommunityPostPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
