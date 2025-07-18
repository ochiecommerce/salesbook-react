import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Fab, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add'
import { createNote } from "../api";

const NewNote = ({open,setOpen})=>{
    const [note,setNote] = useState('')
    const onDone = ()=>{
        createNote({note}).then(res=>{
            setOpen(false)
        })
    }
    return (
        <Dialog open={open}>
            <DialogTitle>Create a note</DialogTitle>
            <DialogContent>
                <TextField label='note' name="note" value={note} onChange={(e)=>setNote(e.target.value)}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={onDone}>Add</Button>
            </DialogActions>
        </Dialog>
    )
}

const NotesList = ({notes})=>{
    const navigate = useNavigate()
    const [creating,setCreating] = useState(notes.length===0)
    return (<List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <NewNote open={creating} setOpen={setCreating}/>
        {notes.map((note) => (
          <div key={note.primary.pk} onClick={()=>navigate(`/notes/${note.primary.pk}`)}>
            <ListItem
              alignItems="flex-start"
              sx={{
                "&:hover": { backgroundColor: "#f0f0f0", cursor: "pointer" },
                borderRadius: "8px",
                mb: 1
              }}
            
            >
              <ListItemText
                primary={note.primary.name}
                secondary={
                  <>
                    <Typography variant="body2" color="text.secondary">
                      {note.primary.phone}
                    </Typography>
                  </>
                }
              />
              
            </ListItem>
            <Divider />
          </div>
        ))}
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => setCreating(true)}
          sx={{ position: "fixed", bottom: 24, right: 24 }}
        >
          <AddIcon />
        </Fab>
      </List>)
}

export default NotesList