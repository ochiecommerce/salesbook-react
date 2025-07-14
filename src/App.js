import React, {useEffect} from 'react';
import { useNavigate,BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/AuthContext';
import Home from './Home';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import InquiryPage from './pages/InquiryPage';
import BookingPage from './pages/BookingPage';
import BuyingPage from './pages/BuyingPage';
import FeedbackPage from './pages/FeedbackPage';
import Navigation from './components/Navigation';
import AuthPage from './pages/AuthPage';
import { Navigate } from 'react-router-dom';
import NewPropertyPage from './pages/NewPropertyPage';

const ProtectedRoute = ({children}) => {
  const {user,setNext} = useAuth()
  const isAuth = user ? true : false
  const navigate = useNavigate()


  // get the current page
  const currentPage = window.location.pathname
  useEffect(() => {
    if (!isAuth) {
      setNext(currentPage)
    }
  }, [isAuth, navigate, setNext, currentPage
  ])
  if (isAuth) {
    console.log('user:',user)
      return (
          <>
              {children}
          </>
      )
  }else{
    return <Navigate to='/auth/login'/>
  }
}


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation/>
        <Routes>
          <Route path="/auth/:page" element={<AuthPage/>} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/new_property' element={<NewPropertyPage/>}/>
          <Route path='/properties/:id' element={<PropertyDetailsPage/>}/>
          <Route path='/inquiries/:id' element={<ProtectedRoute><InquiryPage/></ProtectedRoute>}/>
          <Route path='/booking/:id' element={<BookingPage/>}/>
          <Route path='/buying/:id' element={<BuyingPage/>}/>
          <Route path='/feedback/:id' element={<FeedbackPage/>}/>
        </Routes>
        {/* <AppRoutes/> */}
      </Router>
    </AuthProvider>
  );
}

export default App;