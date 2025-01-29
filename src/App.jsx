import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Home from './Components/Home'
import LogIn from './Components/LogIn';
import SignUp from './Components/SignUp';
import Index from './Components/Index';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/index" element={<Index />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
