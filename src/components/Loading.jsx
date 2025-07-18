import React, { useEffect, useState } from "react"
const Loading = ({ text }) => {
    const [display, setDisplay] = useState('.')
    useEffect(() => {
        setInterval(() => {
            if (display === '.') setDisplay('..')
            else if (display === '..') setDisplay('...')
            else setDisplay('.')
        }, 1000)
    },[display])
    return (<div>
        <p>Loading {text}{display}</p>
    </div>)
}
export default Loading