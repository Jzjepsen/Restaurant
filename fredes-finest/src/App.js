import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './pages/Home/home';
import { useUser } from './services/UserContext';
import ManagerOverview from './pages/Manager/Overview';
import StaffManagement from './pages/Manager/StaffManagement/StaffManagement';
import Settings from './pages/Manager/Settings/settings';
import Bookings from './pages/Waiter/Bookings/bookings';
import KitchenOverview from './pages/Kitchen/Overview/Overview';
import WaiterOverview from './pages/Waiter/Overview/Overview';
import CreateOrder from './pages/Waiter/Orders/CreateOrder';
import Payment from './pages/Waiter/Payment/Payment';
import MenuGuest from './pages/Guest/MenuGuest';
import Booking from './pages/Guest/Booking';
import Help from './pages/Guest/Help';
import WaiterMenuView from './pages/Waiter/Menu/WaiterMenuView';
import ManagerMenuView from './pages/Manager/Menu/ManagerMenuView';
import WaiterOrderView from './pages/Waiter/Orders/OrderView';
import KitchenOrderView from './pages/Kitchen/OrderView';
import BookingDate from './pages/Waiter/Bookings/BookingDate';


function App() {
  const { user } = useUser();

  return (
    <div className="content">
      <Navbar /> {/* This renders the Navbar based on the current user role */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="*" element={<Navigate replace to="/" />} />  
        <Route path='/Manager/Overview' element={<ManagerOverview />} />
        <Route path='/Manager/Menu' element={<ManagerMenuView />} />
        <Route path='/Manager/StaffManagement' element={<StaffManagement />} />
        <Route path='/Manager/Settings' element={<Settings />} />
        <Route path='/Waiter/Overview' element={<WaiterOverview />} />
        <Route path='/Waiter/Bookings' element={<Bookings />} />
        <Route path='/Waiter/Menu' element={<WaiterMenuView />} />
        <Route path='/Waiter/Orders' element={<WaiterOrderView />} />
        <Route path='/Waiter/Orders/CreateOrder' element={<CreateOrder />} />
        <Route path='/Waiter/Payment/Payment' element={<Payment />} />
        <Route path='/Kitchen/Overview' element={<KitchenOverview />} />
        <Route path='/Kitchen/Orders' element={<KitchenOrderView />} />
        <Route path='/Guest/Menu' element={<MenuGuest />} />  
        <Route path='/Guest/Booking' element={<Booking />} />
        <Route path='/Guest/Help' element={<Help />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/bookings/:date" element={<BookingDate />} />
      </Routes>
    </div>
  );
}

export default App;
