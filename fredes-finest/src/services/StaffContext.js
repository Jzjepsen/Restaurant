import React, { createContext, useContext, useState, useEffect } from 'react';

const StaffContext = createContext();

export const useStaff = () => useContext(StaffContext);

export const StaffProvider = ({ children }) => {
    const [staff, setStaff] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    const addStaffMember = async (username, password, role) => {
        try {
            const response = await fetch('https://localhost:7033/api/Auth/register', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, role }) // Correctly format the body as JSON object
            });
    
            if (!response.ok) {
                throw new Error('Could not add staff member');
            }
    
            const newStaff = await response.json();
            console.log('Staff member added:', newStaff);
            
            // Optionally, update the staff state with the new member
            setStaff(prevStaff => [...prevStaff, newStaff]);
        } catch (err) {
            console.error('Error adding staff member:', err);
            throw err; // Re-throw the error to be handled by the caller
        }
    };

    return (
        <StaffContext.Provider value={{ staff, isPending, error, addStaffMember }}>
            {children}
        </StaffContext.Provider>
    );
};
