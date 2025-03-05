import React, {useState} from 'react';
import { useAuth } from './auth/AuthContext';

const Dashboard = () => {
  const { logout,user } = useAuth();
  
  return (
    <div>
      <p>welcome {user.username}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;