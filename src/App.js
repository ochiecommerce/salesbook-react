import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { ProtectedRoute } from './auth/ProtectedRoute';
import Login from './Login';
import Dashboard from './Dashboard';
import Home from './Home';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import InquiryPage from './pages/InquiryPage';
import BookingPage from './pages/BookingPage';
import BuyingPage from './pages/BuyingPage';
import FeedbackPage from './pages/FeedbackPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/" element={<Home />} />
          <Route path='/properties/:id' element={<PropertyDetailsPage/>}/>
          <Route path='/inquiries/:id' element={<InquiryPage/>}/>
          <Route path='/booking/:id' element={<BookingPage/>}/>
          <Route path='/buying/:id' element={<BuyingPage/>}/>
          <Route path='/feedback/:id' element={<FeedbackPage/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;