import { Link } from "react-router-dom";

const StaffMember = ({ StaffMember}) => {
    return ( 
        <div className="staff-member">
            {staffs.map(staff => (
                <div className = "staff-preview" key={staff.id}>
                    <Link to={`/staff/${staff.name}`}>
                        <p> { staff.name } </p>
                        <p> First name: { staff.firstName } </p>
                        <p> Last name: {staff.lastName}</p>
                        <p> Age: {staff.age}</p>
                        <p> E-mail: {staff.email}</p>
                    </Link>
                </div>
            ))}
        </div>
     );
}

export default StaffMember;