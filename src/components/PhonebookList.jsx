import React, { useEffect, useState } from "react";
import { getPhonebooks } from "../api";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const PhonebookList = () => {
  const [phonebooks, setPhonebooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPhonebooks().then((res) => setPhonebooks(res.data));
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Your Phonebooks
      </Typography>

      <Grid container spacing={2}>
        {phonebooks.map((pb) => (
          <Grid item key={pb.id} xs={12} sm={6} md={4}>
            <Card
              onClick={() => navigate(`/phonebooks/${pb.id}`)}
              sx={{ cursor: "pointer" }}
            >
              <CardContent>
                <Typography variant="h6">{pb.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {pb.description}
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
        <AddIcon />
      </Fab>
    </div>
  );
};

export default PhonebookList;
