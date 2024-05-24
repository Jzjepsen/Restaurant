import React, { useState } from 'react';
import { useUser } from '../../services/UserContext';
import "./Login.css"

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useUser();

    const handleLogin = (event) => {
        event.preventDefault();
        login(username, password);
    };

    return ( 
        <div className="loginForm" >
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text" 
                        id="username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </div>
                <br/>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <br/>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
