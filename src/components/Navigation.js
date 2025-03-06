import React from "react";
import { Button, Stack, Typography } from "@mui/joy";
import { AppBar, Toolbar } from "@mui/material";
import { useAuth } from "../auth/AuthContext";
import { Link } from "@mui/joy";

const Navigation = () => {
    const { user, logout } = useAuth();
    return (
        <AppBar position="static" color="primary">
            {!user && (
                <Toolbar >
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Real Estate Marketplace
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        <Link href='/auth/login' color="inherit">Login</Link>
                        <Link href='/auth/register' color="inherit">Sign Up</Link>
                    </Stack>

                </Toolbar>
            )}
            {user && (
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Welcome, {user.username}
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        <Link href='/' color="inherit">My Properties</Link>
                        <Link href='/' color="inherit">Bookings</Link>
                        <Link href='/' color="inherit">Inquiries</Link>
                        <Link href='/' color="inherit">Feedback</Link>
                        <Link href='/' color="inherit">Favorites</Link>
                        <Link href='/' color="inherit">Profile</Link>
                        <Link href='/' color="inherit">Messages</Link>
                        <Link href='/' color="inherit">Notifications</Link>
                        <Link href='/' color="inherit">Settings</Link>
                        <Button color="inherit" onClick={logout}>Logout</Button>
                    </Stack>

                </Toolbar>
            )}
        </AppBar>
    );
}

export default Navigation;