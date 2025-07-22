import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Collapse,
  Typography,
  Paper,
  IconButton,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useParams } from "react-router-dom";
import { getContacts, getPhonebook } from "../api";
import PhonebookDetails from "./PhonebookDetails";
import ContactList from "./ContactList";
import Loading from "./Loading";

const PhonebookPage = () => {
  const { phonebookId } = useParams();
  let [phonebook, setPhonebook] = useState({});
  const [contacts, setContacts] = useState();
    useEffect(() => {
      getContacts(phonebookId)
        .then((res) => {
          setContacts(res.data?.data);
        })
        .catch((err) => console.log(err));
    }, [phonebookId]);
  const reloadPhonebook = () => {
    getPhonebook(phonebookId).then((res) => setPhonebook(res.data));
  };
  useEffect(() => {
    getPhonebook(phonebookId).then((res) => {
      setPhonebook(res.data);
    });
  }, [phonebookId]);
  const [collapsed, setCollapsed] = useState(false);
  const detailsRef = useRef(null); // ✅ useRef instead of string ref

  // Collapse when phonebook details reach top
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY <= 20 && collapsed) {
        setCollapsed(false); // Expand when scrolling back to top
      } else if (scrollY > 60 && !collapsed) {
        setCollapsed(true); // Collapse when scrolling down
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [collapsed]);

  const toggleCollapsed = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 4 }}>
      <Paper
        elevation={3}
        ref={detailsRef} // ✅ Proper use of useRef
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          transition: "height 0.3s ease",
          p: collapsed ? 1 : 2,
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">{phonebook.name}</Typography>
          <IconButton onClick={toggleCollapsed}>
            {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </IconButton>
        </Box>

        <Collapse in={!collapsed}>
          <PhonebookDetails phonebook={phonebook} reloadPhonebook={reloadPhonebook}/>
        </Collapse>
      </Paper>

      <Divider sx={{ my: 2 }} />

      <Box>
        
        {contacts?<ContactList contacts={contacts}/>: <Loading text={"contacts"} />}
      </Box>
    </Box>
  );
};

export default PhonebookPage;
