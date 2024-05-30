import React, { useState } from 'react';
import { useStaff } from '../../../services/StaffContext';
import './StaffManagement.css';

const CreateStaff = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Waiter');
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')
    const { addStaffMember } = useStaff();
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsPending(true);
        try {
            await addStaffMember(username, password, firstName, lastName, age, email, role);
        } catch (err) {
            console.error('Failed to add staff member:', err);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="createStaff">
            <h2>Add a new staff member</h2>
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
                    <label>First name:</label>
                    <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label>Last name:</label>
                    <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <label>Age:</label>
                    <input
                        type="number"
                        required
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                    />
                    <label>Email:</label>
                    <input
                        type="text"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Staff role:</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="Waiter">Waiter</option>
                        <option value="KitchenStaff">KitchenStaff</option>
                    </select>
                    {!isPending && <button type="submit">Add staff</button>}
                    {isPending && <button type="submit" disabled>Adding staff...</button>}
                </div>
            </form>
        </div>
    );
};

export default CreateStaff;
