import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import Home from './Home';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import InquiryPage from './pages/InquiryPage';
import BookingPage from './pages/BookingPage';
import BuyingPage from './pages/BuyingPage';
import FeedbackPage from './pages/FeedbackPage';
import Navigation from './components/Navigation';
import AuthPage from './pages/AuthPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation/>
        <Routes>
          <Route path="/auth/:page" element={<AuthPage/>} />
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