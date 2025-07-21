import { Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { checkUsername } from "../api"

export const Username = ({id})=>{
    const [username, setUsername] = useState() 
    useEffect(()=>{
        checkUsername({id}).then(res=>{
            setUsername(res.data.username)
        })
    })
    return (
        <Typography bgcolor={'gray'} borderRadius={2} margin={1}>
            {username}
        </Typography>
    )
}