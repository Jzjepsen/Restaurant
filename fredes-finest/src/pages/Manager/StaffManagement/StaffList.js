import React from "react";
import './StaffManagement.css';

const StaffList = ({ staff }) => {
  const handleRemoveClick = (staffId) => {
    alert(`You clicked the button to remove staff member with ID: ${staffId}`);
  };

  const handleEditClick = (staffId) => {
    alert(`You clicked the button to edit staff member with ID: ${staffId}`);
  };  

  return ( 
    <div>
      {staff.map((staffMember, index) => (
        <div className="staff-member-container" key={index}>
          <p>{staffMember.firstName} {staffMember.lastName}</p>
          <p>Age: {staffMember.age}</p>
          <p>Email: {staffMember.email}</p>
          <p>Role: {staffMember.role}</p>
          <button onClick={() => handleRemoveClick(staffMember.id)}>Remove</button>
          <button onClick={() => handleEditClick(staffMember.id)}>Edit</button>

        </div>
        ))}
    </div>
  );
}

export default StaffList;
