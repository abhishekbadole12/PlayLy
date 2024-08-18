import React, { useState } from 'react'
import styles from "./auth.module.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { SignUp } from '../../services/auth';

export default function Register() {
  const [userDetails, setUserDetails] = useState({ username: '', email: '', password: '', confirm_password: '' })
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const [passwordVisible, setPasswordVisible] = useState(false);

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
      await SignUp(userDetails)
    } catch (error) {
      setError(error?.message)
    } finally {
      setUserDetails({ username: "", email: '', password: '', confirm_password: '' })
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.loginPageContainer}>

      <form className={styles.login} onSubmit={handleSubmit}>
        <h3>Create account</h3>

        <p>Please enter details to register.</p>

        <input type="text" className={styles.inputField} placeholder="Enter username" name='username' onChange={handleChange} />

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
        </div>

        <div className={styles.passwordContainer}>
          <input
            type={passwordVisible ? "text" : "password"}
            className={styles.inputField}
            placeholder="Enter confirm password"
            name='confirm_password'
            onChange={handleChange}
          />
          <div className={styles.eyeIcon} onClick={togglePasswordVisibility}>
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </div>

          {error && <p className={styles.errorTag}>{error}</p>}
        </div>

        <p className={styles.label}>~ Already have account <Link to="/signin"><i>Click here</i></Link></p>

        <button type='submit'>{isLoading ? "Loading..." : 'Register'}</button>

      </form>

    </div>
  )
}
