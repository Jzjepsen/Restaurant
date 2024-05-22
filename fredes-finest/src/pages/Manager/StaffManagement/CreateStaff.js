import React, { useState } from 'react';
import { useStaff } from '../../../services/StaffContext';
import './StaffManagement.css';

const CreateStaff = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Waiter'); // Default value set to "Waiter"
    const { addStaffMember } = useStaff();
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsPending(true);
        try {
            await addStaffMember(username, password, role);
            
        } catch (err) {
            console.error('Failed to add staff member:', err);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="createStaff">
            <h2>Add a new staff member with username and password</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username: </label>
                    <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label>Password:</label>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label>Staff role:</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="Waiter">Waiter</option>
                        <option value="Kitchen staff">Kitchen staff</option>
                    </select>
                    {!isPending && <button type="submit">Add staff</button>}
                    {isPending && <button type="submit" disabled>Adding staff...</button>}
                </div>
            </form>
        </div>
    );
};

export default CreateStaff;
