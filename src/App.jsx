import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './layout/DashboardLayout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import TeamBoard from './pages/TeamBoard.jsx';
import ProjectBoard from './pages/ProjectBoard.jsx';
import UserManagement from './pages/UserManagement.jsx';
import Activity from './pages/Activity.jsx';
import Settings from './pages/Settings.jsx';
import Feed from './pages/Feed.jsx';
import Posts from './pages/Posts.jsx';
import Moderation from './pages/Moderation.jsx';
import Analytics from './pages/Analytics.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}> 
        <Route path='/' element={<Dashboard />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/posts' element={<Posts />} />
        <Route path='/moderation' element={<Moderation />} />
        <Route path='/analytics' element={<Analytics />} />
        <Route path='/activity' element={<Activity />} />
        <Route path='/settings' element={<Settings />} />
      </Route>
    </Routes>
  );
}