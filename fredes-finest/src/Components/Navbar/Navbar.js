import { Link } from 'react-router-dom';
import { useUser } from '../../services/UserContext';
import styles from './navbar.css';

const Navbar = () => {
  const { user } = useUser();


  const renderLinks = () => {
    switch(user.role){
      case 'Manager':
        return (
          <>
              <Link to="/Manager/Overview" className={styles.link}>Manager Overview</Link>
              <Link to="/Manager/Menu" className={styles.link}>Menu</Link>
              <Link to="/Manager/StaffManagement" className={styles.link}>Staff Management</Link>        
              <Link to="/Manager/Settings" className={styles.link}>Settings</Link>        
          </> 
          );
      case 'Waiter':
        return (
        <>
            <Link to="/Waiter/Overview" className={styles.link}>Waiter Overview</Link>
            <Link to="/Waiter/Menu" className={styles.link}> Menu</Link>
            <Link to="/Waiter/Bookings" className={styles.link}>Waiter Bookings</Link>
            <Link to="/Waiter/Orders" className={styles.link}>Waiter Orders</Link>
        </>
        );
        case 'Kitchen':
          return (
          <>
            <Link to="/Kitchen/Overview" className={styles.link}>Kitchen Overview</Link>
            <Link to="/Kitchen/Orders" className={styles.link}>Kitchen Orders</Link>
          </>
          );
          default:
            return (
              <>
              <Link to="/Guest/Booking" className={styles.link}>Book Now</Link>
              <Link to="/Guest/Menu" className={styles.link}>Menu</Link>
              <Link to="/Guest/Help" className={styles.link}>Help me!</Link> 
              </>

            );
  }
};
  return (
    <div className="navbar">
      <Link to="/Home" className={styles.link}>Home</Link>
      {renderLinks()}
    </div>
    );
};

export default Navbar;
