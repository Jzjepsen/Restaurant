// MenuContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const StaffContext = createContext();

export const useStaff = () => useContext(StaffContext);

export const StaffProvider = ({ children }) => {
    const [staff, setStaff] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://localhost:7033/api/Staff', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) throw new Error('Could not fetch the data for that resource');
            return response.json();
        })
        .then(data => {
            setIsPending(false);
            setStaff(data);
            setError(null);
        })
        .catch(err => {
            setIsPending(false);
            setError(err.message);
            console.log(err);
        });
    }, []);

    return (
        <StaffContext.Provider value={{ staff, isPending, error }}>
            {children}
        </StaffContext.Provider>
    );
};
