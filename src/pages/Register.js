import React from "react";
import { useState } from "react";
import { register } from "../api";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password1: "",
        password2: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            alert("Registration successful! Please log in.");
        } catch (error) {
            console.error("Registration failed:", error.response?.data);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={submitHandler}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password1" placeholder="Password" onChange={handleChange} required />
                <input type="password" name="password2" placeholder="Confirm Password" onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
