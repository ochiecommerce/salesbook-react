// components/PhonebookDetails.jsx
import React, { Fragment, useEffect, useState } from "react";
import { Button, Typography, Box, Card, CardContent, Stack, TextField, Alert, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, Divider } from "@mui/material";
import { getPhonebook } from "../api";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { addColumn } from "../api";

const AddColumn = ({ phonebook, onDone }) => {
  const [name, setName] = useState('')
  const [error, setError] = useState(null)
  const [open, setOpen] = useState(false)
  const submit = () => {
    addColumn({ phonebook, name }).then(() => { setOpen(false); onDone() }).catch(err => {
      setError(err)
    })
  }

  return (
    <Fragment>
      <Button onClick={() => setOpen(true)}>Add Column</Button>
      <Dialog open={open} >
        <DialogTitle>Add column</DialogTitle>
        {error && <Alert severity="error">{error.non_field_errors}</Alert>}
        <DialogContent><TextField
          label='Column name'
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button color="primary" variant="contained" onClick={submit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Fragment >



  )
}

const Columns = ({ columns }) => {
  return (
    <List>{columns && <Stack>
      <Typography variant="h6">Columns</Typography>
      {columns.map(column =>
        <ListItem>
          <Typography  key={parseInt(Math.random() * 1000)} >{column.name}</Typography>
        </ListItem>
        
      )}
    </Stack>}</List>

  )
}

const PhonebookDetails = () => {
  const { phonebookId } = useParams();
  const navigate = useNavigate();
  let [phonebook, setPhonebook] = useState({});
  useEffect(() => {
    getPhonebook(phonebookId).then((res) => {
      setPhonebook(res.data)
    });
  }, [phonebookId]
  )
  return (
    <Box>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold">
            {phonebook.name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Owned by: {phonebook?.creator?.username}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {phonebook.contact_count} contacts
          </Typography>
        </CardContent>
      </Card>
      <Columns columns={phonebook.columns} />
      <AddColumn phonebook={phonebookId} onDone={() => phonebookId = phonebookId} />
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(`/phonebooks/${phonebookId}/contacts`)}
      >
        Show Contacts
      </Button>
    </Box>
  );
};

export default PhonebookDetails;
