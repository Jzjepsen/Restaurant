import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './pages/Home/home';
import { useUser } from './services/UserContext';
import ManagerOverview from './pages/Manager/Overview';
import ManagerConfigureMenu from './pages/Manager/ConfigureMenu/CreateMenu';
import StaffManagement from './pages/Manager/StaffManagement/StaffManagement';
import Settings from './pages/Manager/Settings/settings';
import Bookings from './pages/Waiter/Bookings/bookings';
import KitchenOverview from './pages/Kitchen/Overview/Overview';
import WaiterOverview from './pages/Waiter/Overview/Overview';
import CreateOrder from './pages/Waiter/Orders/CreateOrder';
import Payment from './pages/Waiter/Payment/Payment';
import MenuView from './pages/Waiter/Menu/MenuView';
import OrderView from './pages/Waiter/Orders/Order';
import MenuGuest from './pages/Guest/MenuGuest';
import Booking from './pages/Guest/Booking';

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
        <Route path='/Waiter/Bookings' element={<Bookings />} />
        <Route path='/Waiter/Menu' element={<MenuView />} />
        <Route path='/Waiter/Orders' element={<OrderView />} />
        <Route path='/Waiter/Orders/CreateOrder' element={<CreateOrder />} />
        <Route path='/Waiter/Payment/Payment' element={<Payment />} />
        <Route path='/Kitchen/Overview' element={<KitchenOverview />} />
        <Route path='/Guest/Menu' element={<MenuGuest />} />  
        <Route path='/Guest/Booking' element={<Booking />} />
      </Routes>
    </div>
  );
}

export default App;
