import { createContext, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate, } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications
import useAuthStore from './store/authStore'

// Component's
import { AuthProvider } from './components/AuthContext'
import ProtectedRoutes from './components/PrivateRoute'
import { NotFound } from './components/NotFound'

// Context Created
export const UserContext = createContext();

export default function App() {

  const { isAuthenticated } = useAuthStore()

  const [currentSong, setCurrentSong] = useState(null);

  const [mediaPlayer, setMediaPlayer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className='App'>
      <AuthProvider>
        <UserContext.Provider value={{ mediaPlayer, setMediaPlayer, isPlaying, setIsPlaying, currentSong, setCurrentSong }}>
          <Router>
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/login' element={isAuthenticated() ? <Navigate to='/' /> : <Login />} />
              <Route path='/register' element={isAuthenticated() ? <Navigate to='/' /> : <Register />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoutes auth={isAuthenticated()} />}>
                <Route path='/dashboard/*' element={<Dashboard />} />
              </Route>

              {/* Not Found Route */}
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Router>
          {/* Toast */}
          <ToastContainer className="foo" />
        </UserContext.Provider>
      </AuthProvider>
    </div>
  )
}


