import React, { useEffect, useState } from "react";
import { Typography, Container, Grid, Card, CardContent, CardMedia } from "@mui/material";
import PropertyFilter from "./PropertyFilter";
import LoadingAnimation from "./components/Loading";
import api from "./api";

const LandingPage = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        api.get("/properties/")
            .then(response => setProperties(response.data))
            .catch(error => console.error("Error fetching properties:", error));
    }, []);

  if(!properties){
    return <LoadingAnimation/>
  }

    return (
        <>
            {/* Navigation Bar */}

            {/* Hero Section */}
            <Container sx={{ textAlign: "center", padding: "2rem 0" }}>
                <Typography variant="h3" gutterBottom>
                    Find Your Dream Property
                </Typography>
                <Typography variant="h6" color="textSecondary">
                    Browse from thousands of listings and find the perfect home or investment.
                </Typography>
            </Container>

            {/* Property Listings */}
            <Container>
                <PropertyFilter onFilter={(filters) => console.log(filters)} />
                <Grid container spacing={3}>
                    {properties.map((property) => (
                        <Grid item xs={12} sm={6} md={4} key={property.id}>
                            <a href={`/properties/${property.id}`}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={property.image || "http://localhost:9900/media/images/image1.webp"}
                                        alt={property.title}
                                    />
                                    <CardContent>
                                        <Typography variant="h6">{property.title}</Typography>
                                        <Typography color="textSecondary">${property.price}</Typography>
                                    </CardContent>
                                </Card>
                            </a>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
};

export default LandingPage;
