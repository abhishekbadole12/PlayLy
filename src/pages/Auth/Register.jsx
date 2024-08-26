import React, { useEffect, useState } from 'react'
import styles from "./auth.module.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { toast } from 'react-toastify';

export default function Register() {
  const navigate = useNavigate()
  const { register } = useAuthStore()

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
  
  // Toast notification
  const showToast = () =>
    toast.success("User Registered", { position: "bottom-right" });

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await register(userDetails)
      showToast()
      setTimeout(() => {
        navigate('/login')
      }, 1500);
      setUserDetails({ username: "", email: '', password: '', confirm_password: '' })
    } catch (error) {
      setUserDetails({ username: "", email: '', password: '', confirm_password: '' })
      setError(error?.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.loginPageContainer}>

      <form className={styles.login} onSubmit={handleSubmit}>
        <h3>Create account</h3>

        <p>Please enter details to register.</p>

        <input type="text" className={styles.inputField} placeholder="Enter username" name='username' value={userDetails.username} onChange={handleChange} />

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
        </div>

        <div className={styles.passwordContainer}>
          <input
            type={passwordVisible ? "text" : "password"}
            className={styles.inputField}
            placeholder="Enter confirm password"
            name='confirm_password'
            value={userDetails.confirm_password}
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
