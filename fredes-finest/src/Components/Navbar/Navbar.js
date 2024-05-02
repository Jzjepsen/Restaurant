import { Link } from 'react-router-dom';
import { useUser } from '../../services/UserContext';
import styles from './navbar.css';

const Navbar = () => {
  const { user } = useUser(); // Get the current user role


  const renderLinks = () => {
    switch(user.role){
      case 'Manager':
        return (
          <>
              <Link to="/Manager/Overview" className={styles.link}>Manager Overview</Link>
              <Link to="/Manager/ConfigureMenu" className={styles.link}>Configure Menu</Link>
              <Link to="/Manager/StaffManagement" className={styles.link}>Staff Management</Link>        
              <Link to="/Manager/Settings" className={styles.link}>Settings</Link>        
          </>
          );
      case 'Waiter':
        return (
        <>
            <Link to="/Waiter/Overview" className={styles.link}>Waiter Overview</Link>
            <Link to="/Waiter/Menu" className={styles.link}>Waiter Menu</Link>
            <Link to="/Waiter/Bookings" className={styles.link}>Waiter Bookings</Link>
            <Link to="/Waiter/Orders" className={styles.link}>Waiter Orders</Link>
        </>
        );
        case 'Kitchen':
          return (
          <>
            <Link to="/Waiter/Overview" className={styles.link}>Kitchen Overview</Link>
          </>
          );
          default:
            return null;
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
