import { AppBar, Button } from "@mui/material";

export const NavigationBar = ()=>{
    return (
        <AppBar>
            
            <Button>Orders</Button>
            <Button>Reviews</Button>
            <Button>Reminders</Button>
            <Button>Forum</Button>
            <Button>Updates</Button>
        </AppBar>
    )
}