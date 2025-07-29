import React from "react";

import { AuthProvider } from "./context/AuthContext";
import NavigationDrawer from "./components/TreeNav";
import AppRoutes from "./AppRoutes";
import { NavigationBar } from "./components/NavigationBar";


const App = () => {

  return (
    <AuthProvider>
        <NavigationDrawer/>
        <NavigationBar/>
        <AppRoutes/>
    </AuthProvider>)
}

export default App;
