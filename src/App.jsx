import { useState } from 'react'
import './App.css'
// import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Home from './Components/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Home/>
      <Footer />
    </>
  )
}

export default App
