import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "antd";

import handleLogin from "../../services/handleLogin";

import styles from "./SignIn.module.scss";

export default function SignIn() {
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      user: {
        email: e.target.email.value,
        password: e.target.password.value,
      },
    };

    await handleLogin(formData, setError);
  };

  return (
    <>
      {error && (
        <Alert
          className={styles.error}
          message="Error"
          description={error}
          type="error"
          showIcon
          closable
          onClose={() => {
            setTimeout(() => setError(null), 300);
          }}
        />
      )}
      <div className={styles.loginContainer}>
        <h2 className={styles.loginTitle}>Sign In</h2>
        <form onSubmit={onSubmit}>
          <div className={styles.loginField}>
            <label htmlFor="email" className={styles.loginLabel}>
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.loginInput}
              placeholder="Email address"
              autoComplete="email"
              maxLength="254"
              required
              autoFocus
            />
          </div>

          <div className={styles.loginField}>
            <label htmlFor="password" className={styles.loginLabel}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.loginInput}
              placeholder="Password"
              minLength="6"
              maxLength="30"
              required
            />
          </div>

          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>

        <p className={styles.loginFooter}>
          Don’t have an account?{" "}
          <Link className={styles.loginSignupLink} to="/sign-up">
            Sign Up.
          </Link>
        </p>
      </div>
    </>
  );
}
