import { createContext, useMemo, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import './App.css'
import PrivateRoute from './components/PrivateRoute'
import { AuthProvider } from './components/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications

export const UserContext = createContext()

export default function App() {

  const [currentSong, setCurrentSong] = useState(null);


  return (
    <div className='App'>
      <AuthProvider>
          <UserContext.Provider value={{ currentSong, setCurrentSong, }}>
            <Router>
              <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/dashboard' element={<Dashboard />} />
              </Routes>
            </Router>
            <ToastContainer className="foo"/>
          </UserContext.Provider>
      </AuthProvider>
    </div>
  )
}


