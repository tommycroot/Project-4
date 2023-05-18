import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'

import NavBar from './components/NavBar'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Home from './components/Home'
import MatchNew from './components/match/MatchNew'
import MatchPage from './components/match/MatchPage'
import Profile from './components/Profile'
import MatchEdit from './components/match/MatchEdit'

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
          <Route path="/match/:id" element={<MatchPage />} /> 
          <Route path="/match/:id/edit" element={<MatchEdit />} />
          <Route path="/profile" element={<Profile />} /> 
        </Routes>
      </BrowserRouter>
    </div>

  )

}

export default App
