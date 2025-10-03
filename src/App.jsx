import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './layout/DashboardLayout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import TeamBoard from './pages/TeamBoard.jsx';
import ProjectBoard from './pages/ProjectBoard.jsx';
import UserManagement from './pages/UserManagement.jsx';
import Activity from './pages/Activity.jsx';
import Settings from './pages/Settings.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}> 
        <Route path='/' element={<Dashboard />} />
        <Route path='/team' element={<TeamBoard />} />
        <Route path='/projects' element={<ProjectBoard />} />
        <Route path='/users' element={<UserManagement />} />
        <Route path='/activity' element={<Activity />} />
        <Route path='/settings' element={<Settings />} />
      </Route>
    </Routes>
  );
}