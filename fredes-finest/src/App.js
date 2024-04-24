import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './pages/Home/home';
import { useUser } from './services/UserContext';
import ManagerOverview from './pages/Manager/Overview';
import ManagerConfigureMenu from './pages/Manager/ConfigureMenu/CreateMenu';
import StaffManagement from './pages/Manager/StaffManagement/StaffManagement';
import Settings from './pages/Manager/Settings/settings';
import WaiterOverview from './pages/Waiter/Overview/Overview';
import WaiterMenu from './pages/Waiter/Menu/menu';
import Bookings from './pages/Waiter/Bookings/bookings';
import Orders from './pages/Waiter/Orders/orders'
import KitchenOverview from './pages/Kitchen/Overview/Overview';



function App() {
  // This user context is used to determine what to render in Navbar
  const { user } = useUser();

  return (
    <div className="content">
      <Navbar /> {/* This renders the Navbar based on the current user role */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="*" element={<Navigate replace to="/" />} />  
        <Route path='/Manager/Overview' element={<ManagerOverview />} />
        <Route path='/Manager/ConfigureMenu' element={<ManagerConfigureMenu />} />
        <Route path='/Manager/StaffManagement' element={<StaffManagement />} />
        <Route path='/Manager/Settings' element={<Settings />} />
        <Route path='/Waiter/Overview' element={<WaiterOverview />} />
        <Route path='/Waiter/Menu' element={<WaiterMenu />} />
        <Route path='/Waiter/Bookings' element={<Bookings />} />
        <Route path='/Waiter/Orders' element={<Orders/>} />
        <Route path='/Kitchen/Overview' element={<KitchenOverview />} />
      </Routes>
    </div>
  );
}

export default App;
