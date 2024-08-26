import React, { useState } from 'react';
import styles from "./auth.module.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

export default function Login() {
  const navigate = useNavigate()

  const { login } = useAuthStore()

  const [userDetails, setUserDetails] = useState({ email: 'abhishekbadole8@gmail.com', password: 'abhishek' })
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const [passwordVisible, setPasswordVisible] = useState(false);

  // handle toggle
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // handle change
  const handleChange = (e) => {
    setUserDetails((prev) => ({
      ...prev, [e.target.name]: e.target.value
    }))
  }

    // Toast notification
    const showToast = () =>
      toast.success("User Registered", { position: "bottom-right" });

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await login(userDetails)
      setUserDetails({ email: "", password: "" })
      navigate('/dashboard')
    } catch (error) {
      setUserDetails({ email: "", password: "" })
      setError(error?.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.loginPageContainer}>

      <form className={styles.login} onSubmit={handleSubmit}>
        <h3>Login</h3>

        <p>Please enter your email and password to login.</p>

        <input type="email" className={styles.inputField} placeholder="Enter email" name='email' value={userDetails.email} onChange={handleChange} />

        <div className={styles.passwordContainer}>
          <input
            type={passwordVisible ? "text" : "password"}
            className={styles.inputField}
            placeholder="Enter password"
            name='password'
            value={userDetails.password}
            onChange={handleChange}
          />

          <div className={styles.eyeIcon} onClick={togglePasswordVisibility}>
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </div>

          {error && <p className={styles.errorTag}>{error}</p>}
        </div>


        <p className={styles.label}>~ To register <Link to="/signup"><i>Click here</i></Link></p>

        <button type='submit'>{isLoading ? 'Loading...' : 'Sign In'}</button>

      </form>

    </div>
  );
}
