import React from "react";
import { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
    const { handleLogin } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();


    const submitHandler = async (e) => {
        e.preventDefault();
        await handleLogin({ username, password });
        // Redirect back to previous page or default to '/'
        const from_ = location.state?.from || "/protected";
        console.log(`🔄 Redirecting back to: ${from_}`);
        navigate(from_, { replace: true });
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={submitHandler}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
