import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'

import NavBar from './components/NavBar'
import Register from './components/Auth/Register'
import Login from './components/Auth/Login'
import Home from './components/Home'
import MatchNew from './components/Match/MatchNew'

const App = () => {

  return (
    <div className="site-wrapper">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Register />} /> 
          <Route path="/match/new" element={<MatchNew />} /> 
        </Routes>
      </BrowserRouter>
    </div>

  )

}

export default App
