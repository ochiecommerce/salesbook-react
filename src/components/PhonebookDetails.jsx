// components/PhonebookDetails.jsx
import React, { Fragment, useState } from "react";
import {
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  Accordion,
  AccordionSummary,
} from "@mui/material";
import { addReadPermission } from "../api/contacts";
import { addColumn } from "../api/contacts";
import UsernameInput from "./UsernameInput";
import { Username } from "./User";
import { ListView } from "./ListView";
const AddColumn = ({ phonebook, onDone }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const submit = () => {
    addColumn({ phonebook, name })
      .then(() => {
        setOpen(false);
        onDone();
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <Fragment>
      <Button onClick={() => setOpen(true)}>Add Column</Button>
      <Dialog open={open}>
        <DialogTitle>Add column</DialogTitle>
        {error && <Alert severity="error">{error.non_field_errors}</Alert>}
        <DialogContent>
          <TextField
            label="Column name"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            disabled={!name.trim()}
            color="primary"
            variant="contained"
            onClick={submit}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

const Columns = ({ columns, onColumnsChange, phonebookId }) => {
  return (
    <Accordion>
      <AccordionSummary>
        <Typography variant="h6">Columns</Typography>
      </AccordionSummary>
      <ListView
        Component={({row}) => {
          return (
          <ListItem>
            <Typography>{row.name}</Typography>
          </ListItem>
        )}}
        data={columns}
      />
      <AddColumn phonebook={phonebookId} onDone={onColumnsChange} />
    </Accordion>
  );
};

const AddReadPermission = ({ phonebookId, onPermissionsChange }) => {
  const [uid, setUid] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const onOk = () => {
    addReadPermission(phonebookId, uid).then((res) => {
      onPermissionsChange();
      setOpen(false);
    });
  };
  return (
    <Fragment>
      <Button onClick={() => setOpen(true)}>Add Read Permission</Button>
      <Dialog open={open}>
        <DialogTitle>Add Read Permission</DialogTitle>
        <DialogContent>
          <UsernameInput setId={setUid} setError={setError} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button disabled={!!error} onClick={onOk}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

const ReadPermissions = ({ permissions, onPermissionsChange, phonebookId }) => {
  return (
    <Accordion>
      <AccordionSummary>
        <Typography variant="h6">Read Permissions</Typography>
      </AccordionSummary>
      {permissions && (
        <List>
          {permissions.map((permission, index) => (
            <ListItem key={index}>
              <Username id={permission.user} />
            </ListItem>
          ))}
        </List>
      )}
      <AddReadPermission
        phonebookId={phonebookId}
        onPermissionsChange={onPermissionsChange}
      />
    </Accordion>
  );
};

const PhonebookDetails = ({phonebook,reloadPhonebook}) => {
  const phonebookId = phonebook.pk
  return (
    <Box>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold">
            {phonebook.name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Created by: {phonebook?.creator?.username}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {phonebook.contact_count} contacts
          </Typography>
        </CardContent>
      </Card>
      <Columns
        phonebookId={phonebookId}
        columns={phonebook.columns}
        onColumnsChange={reloadPhonebook}
      />
      <ReadPermissions
        phonebookId={phonebookId}
        permissions={phonebook.read_permissions}
        onPermissionsChange={reloadPhonebook}
      />
      <Box mt={2} textAlign="center">
        <Typography variant="body2" color="textSecondary">
          Manage your phonebook and contacts efficiently.
        </Typography>
      </Box>

    </Box>
  );
};

export default PhonebookDetails;
