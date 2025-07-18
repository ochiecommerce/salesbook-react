import React from "react";

// Pages / Components


import { AuthProvider } from "./context/AuthContext";
import NavigationDrawer from "./components/NavigationDrawer";
import AppRoutes from "./AppRoutes";


const App = () => {

  return (
    <AuthProvider>
        <NavigationDrawer/>
        <AppRoutes/>
    </AuthProvider>)
}

export default App;
