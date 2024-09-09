import React, { useState } from 'react';
import styles from "./auth.module.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

export default function Login() {
  const navigate = useNavigate()

  const { login, isLoading, isError } = useAuthStore()

  const [userDetails, setUserDetails] = useState({ email: '', password: '' })
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isDemoAccount, setIsDemoAccount] = useState(false);

  // Demo account credentials
  const demoCredentials = {
    email: import.meta.env.VITE_EMAIL,
    password: import.meta.env.VITE_PASSWORD
  };

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

  // handle demo account checkbox change
  const handleDemoAccountChange = (e) => {
    setIsDemoAccount(e.target.checked);

    if (e.target.checked) {
      setUserDetails(demoCredentials);
    } else {
      setUserDetails({ email: '', password: '' });
    }
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(userDetails);
      setUserDetails({ email: "", password: "" })
      navigate(`/dashboard?playlist=songs`)

    } catch (error) {
      setUserDetails({ email: "", password: "" })
      setErrorMsg(error?.message)
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

          {userDetails.password != '' &&
            <div className={styles.eyeIcon} onClick={togglePasswordVisibility}>
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </div>}

          {isError && <p className={styles.errorTag}>{errorMsg}</p>}
        </div>

        {/* Demo account checkbox */}
        <div className={styles.demoAccount}>
          <label>
            <input
              type="checkbox"
              checked={isDemoAccount}
              onChange={handleDemoAccountChange}
            />
            Use demo account
          </label>
        </div>

        <p className={styles.label}>~ To register <Link to="/register"><i>Click here</i></Link></p>

        <button type='submit'>{isLoading ? 'Loading...' : 'Sign In'}</button>

      </form>
    </div>
  );
}
