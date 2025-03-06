import React, { useEffect, useState } from "react";
import { Container, Typography,Card, CardMedia, CardContent} from "@mui/material";
import QuickActions from "./QuickActions";
import LoadingAnimation from "./Loading";
import api from "../api";

const PropertyDetails = ({id}) => {
  const [property, setProperty] = useState(null);

  useEffect(() => {
    api.get(`/properties/${id}/`)
      .then(response => setProperty(response.data))
      .catch(error => console.error("Error fetching property details:", error));
  }, [id]);

  if(!property){
    return <LoadingAnimation/>
  }

  return (
    <Container sx={{ marginTop: 4 }}>
      <Card>
        <CardMedia
          component="img"
          height="400"
          image={property.image || "http://localhost:9900/media/images/image1.webp"}
          alt={property.title}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>{property.title}</Typography>
          <Typography variant="h6" color="textSecondary">${property.price}</Typography>
          <Typography variant="body1" sx={{ marginTop: 2 }}>{property.description}</Typography>
          {/* Quick Actions */}
          <QuickActions id={id}/>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PropertyDetails;
