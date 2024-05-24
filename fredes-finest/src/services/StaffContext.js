import React, { createContext, useContext, useState } from 'react';

const StaffContext = createContext();

export const useStaff = () => useContext(StaffContext);

export const StaffProvider = ({ children }) => {
    const [staff, setStaff] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    const addStaffMember = async (username, password, firstName, lastName, age, email, role) => {
        try {
            const response = await fetch('https://localhost:7033/api/Auth/register', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, firstName, lastName, age, email, role })
            });

            if (!response.ok) {
                throw new Error('Could not add staff member');
            }

            const newStaff = await response.json();
            console.log('Staff member added:', newStaff);

            setStaff(prevStaff => [...prevStaff, newStaff]);
        } catch (err) {
            console.error('Error adding staff member:', err);
            throw err;
        }
    };

    const getUser = async () => {
        try {
            const response = await fetch('https://localhost:7033/api/User', {
                method: 'GET',
                headers: { "accept": "application/json" },
            });

            if (!response.ok) {
                throw new Error('Could not fetch staff list');
            }

            const staffList = await response.json();
            console.log('Fetched staff list:', staffList);

            setStaff(staffList);
            setIsPending(false);
        } catch (err) {
            console.error('Error fetching staff list:', err);
            setError(err);
            setIsPending(false);
        }
    };

    return (
        <StaffContext.Provider value={{ staff, isPending, error, addStaffMember, getUser }}>
            {children}
        </StaffContext.Provider>
    );
};
