import React, { useState } from 'react';
import styles from "./auth.module.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function SignIn() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className={styles.loginPageContainer}>

      <div className={styles.login}>
        <h3>Sign In</h3>

        <p>Please enter your email and password to login.</p>

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

        <button>Sign In</button>
        
      </div>

    </div>
  );
}
