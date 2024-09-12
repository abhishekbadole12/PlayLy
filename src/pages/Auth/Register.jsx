import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styles from "./auth.module.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useAuthStore from '../../store/authStore';
import { showToast } from '../../utils/showToast';
import { validateRegistrationForm } from '../../utils/validateRegistrationForm';

export default function Register() {
  const navigate = useNavigate();

  const { register, isError, isLoading } = useAuthStore()

  const [userDetails, setUserDetails] = useState({ username: '', email: '', password: '', confirm_password: '' })
  const [errorMsg, setErrorMsg] = useState(null)
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // handle change
  const handleChange = (e) => {
    setErrorMsg(null);

    setUserDetails((prev) => ({
      ...prev, [e.target.name]: e.target.value
    }))
  }

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { isValid, errors } = await validateRegistrationForm(userDetails);
    if (!isValid) {
      const errorMessages = Object.values(errors).join(' ');
      setErrorMsg(errorMessages);
      return;
    }

    try {
      await register(userDetails)
      showToast('User Registered, Redirecting to Login page')
      setTimeout(() => {
        navigate('/login')
      }, 1500);
      setUserDetails({ username: "", email: '', password: '', confirm_password: '' })
    } catch (error) {
      setErrorMsg(error?.message)
      setUserDetails({ username: "", email: '', password: '', confirm_password: '' })
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
          {userDetails.password != '' && <div className={styles.eyeIcon} onClick={togglePasswordVisibility}>
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </div>}
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
          {userDetails.confirm_password != '' && <div className={styles.eyeIcon} onClick={togglePasswordVisibility}>
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </div>}

          {isError && <p className={styles.errorTag}>{errorMsg}</p>}
        </div>

        <p className={styles.label}>~ Already have account <Link to="/login"><i>Click here</i></Link></p>

        <button type='submit' disabled={isLoading}>{isLoading ? "Loading..." : 'Register'}</button>

      </form>

    </div>
  )
}
