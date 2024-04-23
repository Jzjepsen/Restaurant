import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './pages/Home/home';
import { useUser } from './services/UserContext';
import ManagerOverview from './pages/Manager/Overview';
import KitchenOverview from './pages/Kitchen/Overview/Overview';
import WaiterOverview from './pages/Kitchen/Overview/Overview';
import Menu from './pages/Menu';


function App() {
  const { user } = useUser(); // Assuming useUser returns the current user role among other properties

  return (
    <div className="content">
    <Navbar /> {/* This should render the Navbar */}
          <Routes>
            <Route path='/Home' element={<Home />} />
            <Route path='/Manager/Overview' element={<ManagerOverview />} />
            <Route path='/Kitchen/Overview' element={<KitchenOverview />} />
            <Route path='/Waiter/Overview' element={<WaiterOverview />} />
            <Route path='/Menu' element={<Menu />} />

          </Routes>
      </div>
  );
}

export default App;
