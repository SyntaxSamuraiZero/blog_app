import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import handleLogin from "../../services/handleLogin";

import styles from "./SignIn.module.scss";

export default function SignIn({ setUser, setIsAuthenticated }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const formData = {
      user: {
        email: data.email,
        password: data.password,
      },
    };

    await handleLogin(formData, setUser, setIsAuthenticated, navigate);
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.loginTitle}>Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.loginField}>
          <label htmlFor="email" className={styles.loginLabel}>
            Email address
          </label>
          <input
            type="email"
            id="email"
            className={styles.loginInput}
            placeholder="Email address"
            autoComplete="email"
            {...register("email", {
              required: "*email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Enter a valid email address",
              },
            })}
            autoFocus
          />
          {errors.email && (
            <p className={styles.errorText}>{errors.email.message}</p>
          )}
        </div>

        <div className={styles.loginField}>
          <label htmlFor="password" className={styles.loginLabel}>
            Password
          </label>
          <input
            type="password"
            id="password"
            className={styles.loginInput}
            placeholder="Password"
            {...register("password", {
              required: "*password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
              maxLength: {
                value: 40,
                message: "Password cannot exceed 40 characters",
              },
            })}
          />
          {errors.password && (
            <p className={styles.errorText}>{errors.password.message}</p>
          )}
        </div>

        <button type="submit" className={styles.loginButton}>
          Login
        </button>
      </form>

      <p className={styles.loginFooter}>
        Don’t have an account?{" "}
        <Link className={styles.loginSignUpLink} to="/sign-up">
          Sign Up.
        </Link>
      </p>
    </div>
  );
}
