import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "./Header.module.scss";

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  return (
    <header className={styles["header"]}>
      <Link className={styles["header__home"]} to="/">
        Realworld Blog
      </Link>
      {!isAuthenticated ? (
        <div>
          <Link className={styles["header__sign-in"]} to="/sign-in">
            Sign In
          </Link>
          <Link className={styles["header__sign-up"]} to="/sign-up">
            Sign Up
          </Link>
        </div>
      ) : (
        <div>
          <Link className={styles["header__create-article"]} to="/new-article">
            Create article
          </Link>
          <Link className={styles["header__edit-profile"]} to="/profile">
            John Doe
          </Link>
          <button className={styles["header__log-out"]} onClick={handleLogout}>
            Log Out
          </button>
        </div>
      )}
    </header>
  );
}
