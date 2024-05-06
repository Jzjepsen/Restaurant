import CreateStaff from "../StaffManagement/CreateStaff";
import StaffList from "./StaffList";
import './StaffManagement.css';

const StaffManagement = () => {
    const staffData = [
        { firstName: 'Søren', lastName: 'Hansen', age: '44', email: 'shansen@gmail.com' },
        { firstName: 'Marcus', lastName: 'Milo', age: '25', email: 'milo@gmail.com' },
        { firstName: 'Rasmus', lastName: 'Pedersen', age: '25', email: 'rasmus1311@live.dk' }
      ];
    
      return (
        <div className="staff-management-container">
            <div className="staff-list-container">
                <h2>Staff List</h2>
                <StaffList staff={staffData} />
            </div>
            <div className="create-staff-container">
                <CreateStaff />
            </div>
        </div>
      );
    }
 
export default StaffManagement;
