import React, { useEffect } from 'react';
import { useStaff } from '../../../services/StaffContext';
import StaffList from './StaffList';
import CreateStaff from './CreateStaff';
import './StaffManagement.css';

const StaffManagement = () => {
    const { staff, getUser, isPending, error } = useStaff();

    useEffect(() => {
        getUser();
    }, []);

    if (isPending) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Staff Management</h1>
            <div className="staff-management-container">
                <div className="staff-list-container">
                    <StaffList staff={staff} />
                </div>
                <div className="create-staff-container">
                    <CreateStaff />
                </div>
            </div>
        </div>
    );
};

export default StaffManagement;
