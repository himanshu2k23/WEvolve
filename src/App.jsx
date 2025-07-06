import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Components/Home';
import LogIn from './Components/LogIn';
import SignUp from './Components/SignUp';
import Index from './Components/Index';
import BookingPage from './Components/BookingPage';   // ← import it
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Appointments from './Components/Appointments';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/index" element={<Index />} />
        <Route path="/book/:id" element={<BookingPage />} /> 
        <Route path='/appointments' element={<Appointments/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;