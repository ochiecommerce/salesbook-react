import React from "react";
import { AuthContext } from "../AuthContext";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Protected = () => {
    const { user, logout } = useContext(AuthContext);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        console.log("🔍 Checking user authentication...");

        if (!user?.token) {
            console.log("🚨 No auth token found, redirecting to login...");
            navigate("/login");
            return;
        }

        const fetchProtectedData = async () => {
            console.log("📡 Sending request to protected view...");

            try {
                const response = await axios.get("http://127.0.0.1:8000/protected/", {
                    headers: {
                        Authorization: `Token ${user.token}`, // Send the token
                    },
                });

                console.log("✅ Protected route response:", response.data);
                setMessage(response.data.message);
            } catch (error) {
                console.error("❌ Access denied:", error.response?.data || error.message);
                navigate("/login"); // Redirect if unauthorized
            }
        };

        fetchProtectedData();
    }, [user, navigate]);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div>
            <h2>Protected Page</h2>
            <p>{message || "Loading..."}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Protected;
