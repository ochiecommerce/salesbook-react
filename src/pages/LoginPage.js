import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
    const [logged, setLogged] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (logged) {

            navigate('/')

        }
    }, [logged])
    return (
        <LoginForm setAuth={setLogged} />
    )
}

export default LoginPage