import React, { useState } from 'react';
import styles from "./auth.module.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { SignIn } from '../../services/auth';

export default function Login() {
  const [userDetails, setUserDetails] = useState({ email: '', password: '' })
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

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await SignIn(userDetails)
    } catch (error) {
      setError(error?.message)
    } finally {
      setUserDetails({ email: '', password: '' })
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.loginPageContainer}>

      <form className={styles.login} onSubmit={handleSubmit}>
        <h3>Login</h3>

        <p>Please enter your email and password to login.</p>

        <input type="email" className={styles.inputField} placeholder="Enter email" name='email' onChange={handleChange} />

        <div className={styles.passwordContainer}>
          <input
            type={passwordVisible ? "text" : "password"}
            className={styles.inputField}
            placeholder="Enter password"
            name='password'
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
