import {
  Button,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavigationDrawer = () => {
  const [open, setOpen] = useState(false);
  const {logout} = useAuth()
  return (
    <Grid container justify="space-between">
      <Grid item>
        <Drawer open={open} onClose={() => setOpen(false)}>
          <List>
            <ListItem button onClick={() => setOpen(false)}>
              <ListItemText>Home</ListItemText>
            </ListItem>
            <ListItem button onClick={() => setOpen(false)}>
              <ListItemText>Page 2</ListItemText>
            </ListItem>
            <ListItem button onClick={() => setOpen(false)}>
              <ListItemText>
                <Link to={"/notes"}>Notes</Link>
              </ListItemText>
            </ListItem>
            <ListItem button onClick={() => setOpen(false)}>
              <ListItemText>
                <Link to={"/phonebooks"}>Phonebooks</Link>
              </ListItemText>
            </ListItem>
            <ListItem
              button 
              onClick={() => {
                setOpen(false);
                logout()
              }}
            >
              <ListItemText >Logout</ListItemText>
            </ListItem>
          </List>
        </Drawer>
      </Grid>
      <Grid item>
        <Button onClick={() => setOpen(!open)}>
          {open ? "Hide" : "Show"} Drawer
        </Button>
      </Grid>
    </Grid>
  );
};

export default NavigationDrawer;
