import '@/App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import ArchivePage from './pages/archive/ArchivePage';
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
import SearchPage from './pages/SearchPage';
import ChatRoomPage from './pages/community/ChatRoomPage';
import ChatPage from './pages/community/ChatPage';
import CalendarReportPage from './pages/calendar/CalendarReportPage';
import CalendarReportLocationPage from './pages/calendar/CalendarReportLocation';
import CalendarReportPerformancePage from './pages/calendar/CalendarReportPerformancePage';
import CalendarLayout from './layout/CalendarLayout';
import CalendarPage from './pages/calendar/CalendarPage';
import SettingLayout from './layout/SettingLayout';
import SettingAccountPage from './pages/setting/SettingAccountPage';
import SettingActivityPage from './pages/setting/SettingActivityPage';
import SettingSupportPage from './pages/setting/SettingSupportPage';
import PerformanceAllPage from './pages/main/PerformanceAllPage';
import SharePostsPage from './pages/community/SharePostsPage';
import MainPage from './pages/main/MainPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import {useAuthStore} from './stores/authStore';
import {useEffect} from 'react';
import AnnouncementPage from './pages/setting/AnnouncementPage';
import AnnouncementDetailPage from './pages/setting/AnnouncementDetailPage';
import PolicyTermsPage from './pages/setting/PolicyTermsPage';
import PolicyPrivacyPage from './pages/setting/PolicyPrivacyPage';
import EnquirePage from './pages/setting/EnquirePage';
import ScrappedMagazinePage from './pages/ScrappedMagazinePage';
import ScrappedPostPage from './pages/ScrappedPostPage';
import WrittenPostPage from './pages/WrittenPostPage';
import WrittenCommentPage from './pages/WrittenCommentPage';

function App() {
  const {isAuthenticated, isLoading} = useAuthStore();

  useEffect(() => {
    const checkUserAuth = async () => {
      await useAuthStore.getState().checkAuth();
    };
    checkUserAuth();
  }, []);

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
            </Route>
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
            <Route path='/calendar' element={<CalendarPage />} />
            <Route path='/performance' element={<PerformanceAllPage />} />
          </Route>
          <Route element={<CommunityMainLayout />}>
            <Route path='/community' element={<CommunityMainPage />} />
            <Route path='/community/:category' element={<FilteredPostList />} />
            <Route path='/magazine' element={<MagazinePage />} />
            <Route path='/chat' element={<ChatPage />} />
            <Route path='/chatRoom/:id' element={<ChatRoomPage />} />
            <Route path='/performance' element={<PerformanceAllPage />} />
            <Route path='/community/share' element={<SharePostsPage />} />

            {/* 로그인 된 상태만 접근 가능 */}
            <Route
              element={
                <ProtectedRoute
                  isLoggedIn={isAuthenticated}
                  isLoading={isLoading}
                />
              }>
              <Route
                path='/scrap-magazine'
                element={<ScrappedMagazinePage />}
              />
              <Route path='/scrap-post' element={<ScrappedPostPage />} />
              <Route path='/written-post' element={<WrittenPostPage />} />
              <Route path='/written-comment' element={<WrittenCommentPage />} />

              <Route path='/settings' element={<SettingLayout />}>
                <Route path='account' element={<SettingAccountPage />} />
                <Route path='activity' element={<SettingActivityPage />} />
                <Route path='support' element={<SettingSupportPage />} />
              </Route>
            </Route>
          </Route>
          <Route
            path='/magazine/:magazineId'
            element={<MagazineDetailPage />}
          />

          {/* settings */}
          <Route path='/settings/announcement' element={<AnnouncementPage />} />
          <Route
            path='/settings/announcement/:id'
            element={<AnnouncementDetailPage />}
          />
          <Route path='/settings/enquire' element={<EnquirePage />} />
          <Route path='/settings/policy-terms' element={<PolicyTermsPage />} />
          <Route
            path='/settings/policy-privacy'
            element={<PolicyPrivacyPage />}
          />
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
