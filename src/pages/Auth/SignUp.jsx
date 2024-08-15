import React, { useState } from 'react'
import styles from "./auth.module.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className={styles.loginPageContainer}>

      <div className={styles.login}>
        <h3>Sign Up</h3>

        <p>Please enter details to register.</p>

        <input type="text" className={styles.inputField} placeholder="Enter username" />

        <input type="email" className={styles.inputField} placeholder="Enter email" />

        <div className={styles.passwordContainer}>
          <input
            type={passwordVisible ? "text" : "password"}
            className={styles.inputField}
            placeholder="Enter password"
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
          />
          <div className={styles.eyeIcon} onClick={togglePasswordVisibility}>
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>

        <button>Sign Up</button>

      </div>

    </div>
  )
}
