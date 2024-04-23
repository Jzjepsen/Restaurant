import { Link } from 'react-router-dom';
import { useUser } from '../../services/UserContext';
import styles from './navbar.css';

const Navbar = () => {
    console.log("Navbar is rendering");  // This will confirm if Navbar is being hit

  const { user } = useUser(); // Get the current user role

  return (
    <div className="navbar">
      <Link to="/Home" className={styles.link}>Home</Link>
      <Link to="/Manager/Overview" className={styles.link}>Manager Overview</Link>
      <Link to="/Kitchen/Overview" className={styles.link}>Kitchen Overview</Link>
      <Link to="/Waiter/Overview" className={styles.link}>Waiter Overview</Link>
      <Link to="/Menu" className={styles.link}>Menu Overview</Link>
    </div>
    );
};

export default Navbar;
