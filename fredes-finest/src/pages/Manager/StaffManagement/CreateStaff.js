import { useState } from 'react'

const CreateMenu = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const staff = { firstName, lastName, age, email, role};

        setIsPending(true);

        fetch('http://localhost:8000/staff', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(staff)
        }).then(() => {
            console.log('new staff added');
            setIsPending(false);
        })
    }

    return ( 
        <div className="createStaff">
            <h2> Add a new staff member</h2>
            <form onSubmit={handleSubmit}>
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
                <label>Staff age:</label>
                <input
                    type="text"
                    required
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <label>Staff email:</label>
                <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="Waiter">Waiter</option>
                        <option value="Kitchen staff">Kitchen staff</option>

                    </select>
                {!isPending && <button>Add staff</button>}
                {isPending && <button disabled>Adding staff...</button>}
            </form>
        </div>
     );
}
 
export default CreateMenu;