import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignIn from './pages/Auth/SignIn'
import SignUp from './pages/Auth/Signup'
import Dashboard from './pages/Dashboard/Dashboard'

export default function App() {

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  )
}


