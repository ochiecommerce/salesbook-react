import { checkUsername } from "../api/auth";
import { TextField } from "@mui/material";
import { useRef, useState } from "react";

export const UsernameInput = ({setId, setError}) => {
  const [usernameError, setUsernameError] = useState("");
  const [uname,setUname] = useState('')
  const debounceTimeout = useRef(null);
  
  const setUsernameErrors = (error)=>{
    setUsernameError(error)
    setError(error)
  }
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUname(value);
    setUsernameErrors("");

    // Debounce the API call (wait 300ms after typing)
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (value.length >= 3) {
        checkUsername({username:value})
          .then((response) => {
            if (response.data.valid) {
              setUsernameErrors(
                "Username is not does not exist"
              );
            }
            else setId(response.data?.id)
          })
          .catch(() => {
            setUsernameErrors("Could not validate username");
          });
      }
    }, 300);
  };
  return (
    <TextField
      label="Username"
      fullWidth
      required
      margin="normal"
      value={uname}
      onChange={handleUsernameChange}
      error={!!usernameError}
      helperText={
        usernameError || "Must be unique (letters, numbers, underscores)."
      }
    />
  );
};

export default UsernameInput