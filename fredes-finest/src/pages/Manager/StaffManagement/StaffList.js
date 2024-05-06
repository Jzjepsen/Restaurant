import React from "react";
import './StaffManagement.css';

const StaffList = ({ staff }) => {
  return ( 
    <div>
      {staff.map((staffMember, index) => (
        <div className="staff-member-container" key={index}>
          <p>{staffMember.firstName} {staffMember.lastName}</p>
          <p>Age: {staffMember.age}</p>
          <p>{staffMember.email}</p>
        </div>
      ))}
    </div>
  );
}

export default StaffList;
