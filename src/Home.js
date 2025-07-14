import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import LoadingAnimation from "./components/Loading";
import { getPhonebooks } from "./api";
import { useAuth } from "./auth/AuthContext";
import { Link } from "./components/Navigation";

const LandingPage = () => {
    const [phonebooks, setPhonebooks] = useState([]);
    const { user } = useAuth();
    getPhonebooks()
        .then(response => setPhonebooks(response.data))
        .catch(error => console.error("Error fetching properties:", error));


    if (!phonebooks) {
        return <LoadingAnimation />
    }

    return (
        <>
            <Container>
                {user && <Link to="/new_phonebook">Create Phonebook</Link>}
                <Grid container spacing={3}>
                    {phonebooks.map((property) => (
                        <Grid item xs={12} sm={6} md={4} key={property.id}>
                            <a href={`/phonebooks/${property.id}`}>
                                <div>
                                    <p>{property.name}</p>
                                    <p>{property.creator}</p>
                                </div>
                            </a>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
};

export default LandingPage;
