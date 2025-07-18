import React, { useEffect, useState } from "react";
import { getPhonebooks } from "../api"; // Assumes axios or fetch wrapper
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Person from '@mui/icons-material/Person'

const PhonebookList = () => {
  const [phonebooks, setPhonebooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPhonebooks = async () => {
      try {
        const res = await getPhonebooks();
        setPhonebooks(res.data);
      } catch (error) {
        console.error("Failed to fetch phonebooks:", error);
      }
    };

    fetchPhonebooks();
  }, []); // ✅ Only fetch on component mount

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Your Phonebooks<Person/>
      </Typography>

      <Grid container spacing={2}>
        {phonebooks.map((pb) => (
          <Grid item key={pb.id || pb.pk} xs={12} sm={6} md={4}>
            <Card
              onClick={() => navigate(`/phonebooks/${pb.id || pb.pk}/`)}
              sx={{ cursor: "pointer", "&:hover": { boxShadow: 6 } }}
            >
              <CardContent>
                <Typography variant="h6">{pb.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {pb.description || "No description provided."}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Fab
        color="primary"
        aria-label="add"
        onClick={() => navigate("/phonebooks/new")}
        sx={{ position: "fixed", bottom: 24, right: 24 }}
      >
        <AddIcon/>
        
      </Fab>
    </div>
  );
};

export default PhonebookList;
