import React, { useEffect, useState } from "react";
import { getNotes } from "../api";
import NotesList from "./NotesList";
import { Snackbar } from "@mui/material";

export default function NotesPage() {
    const [notes, setNotes] = useState([])
    const [error, setError] = useState(null)
    useEffect(() => {
        getNotes().then(res => {
            setNotes(res.data)
        }).catch(err => {
            setError(err)

        })
    })
    return (
        <><NotesList notes={notes} />
            <Snackbar content="Error occured" open={Boolean(error)}/></>

    )
}