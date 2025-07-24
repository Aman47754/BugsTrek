import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase'; // Ensure this path is correct
import Navbar from './components/NavBar/Navbar';
import Home from './pages/Home';
import ContestGraph from './components/ContestGraph/ContestGraph'; 
import ApiProvider from './Data/ApiProvider';



import Login from './pages/Login';
import Profile from './pages/Profile';

function App() {

  return (
    <ApiProvider>
      
    
      
        <AuthHandler />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        
    </ApiProvider>
  );
}

function AuthHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const metadata = user.metadata;
        const isNewUser = metadata.creationTime === metadata.lastSignInTime;

        if (isNewUser) {
          console.log("New User - Navigating to Profile");
          navigate('/profile');
        } else {
          console.log("Returning User - Navigating to Home");
          navigate('/');
        }
      } else {
        console.log("Logged Out");
        navigate('/login');
      }
    });
  }, []);

  return null;
}

export default App;
