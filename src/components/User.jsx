import { Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { checkUsername } from "../api"
import Loading from "./Loading"

export const Username = ({id})=>{
    const [username, setUsername] = useState(null) 
    useEffect(()=>{
        checkUsername({id}).then(res=>{
            setUsername(res.data.username)
        })
    })
    if(!username) return <Loading text="username" />
    return (
        <Typography bgcolor={'gray'} borderRadius={2} margin={1}>
            {username}
        </Typography>
    )
}