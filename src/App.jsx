import './App.css'
import { BrowserRouter as Router, Route, Routes, useSearchParams } from 'react-router-dom'
import SignIn from './pages/Auth/SignIn'
import SignUp from './pages/Auth/Signup'
import Dashboard from './pages/Dashboard/Dashboard'
import { createContext, useState } from 'react'

export const UserContext = createContext()

export default function App() {

  const [currentPlayingSongId, setCurrentPlayingSongId] = useState(localStorage.getItem('currentSongId'))

  return (
    <div className='App'>
      <UserContext.Provider value={{ setCurrentPlayingSongId, currentPlayingSongId }}>
        <Router>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  )
}


