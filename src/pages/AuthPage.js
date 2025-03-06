import React, { useEffect, useState } from "react";
import { useNavigate ,useParams} from "react-router-dom";
import AuthForm from "../components/AuthForm";

const LoginPage = () => {
    const [logged, setLogged] = useState(false)
    const {page} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (logged) {

            navigate('/')

        }
    }, [logged])
    if(page === 'login'){
        return (
            <AuthForm setAuth={setLogged} isLogin={true}/>
        )
    }
    return (
        <AuthForm setAuth={setLogged} isLogin={false} />
    )
}

export default LoginPage