import { AppBar, Toolbar, Button } from "@mui/material";

export const NavigationBar = ()=>{
    return (
        <AppBar color="inherit" position="static">
            <Toolbar>
            <Button >Orders</Button>
            <Button >Reviews</Button>
            <Button>Reminders</Button>
            <Button>Forum</Button>
            <Button>Updates</Button>
            </Toolbar>
            
        </AppBar>
    )
}