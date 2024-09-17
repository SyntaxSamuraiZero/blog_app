import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

import styles from './Header.module.scss'

export default function Header({ isAuthenticated, setIsAuthenticated, user, setUser }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('authToken')
    setUser(null)
    navigate('/')
  }

  return (
    <header className={styles['header']}>
      <Link className={styles['header__home']} to='/'>
        Realworld Blog
      </Link>
      {!isAuthenticated ? (
        <div>
          <Link className={styles['header__sign-in']} to='/sign-in'>
            Sign In
          </Link>
          <Link className={styles['header__sign-up']} to='/sign-up'>
            Sign Up
          </Link>
        </div>
      ) : (
        <div>
          <Link className={styles['header__create-article']} to='/new-article'>
            Create article
          </Link>
          <Link className={styles['header__edit-profile']} to='/profile'>
            {user.username}
            <img className={styles['header__image']} src={user.image} alt={user.username} />
          </Link>
          <button className={styles['header__log-out']} onClick={handleLogout}>
            Log Out
          </button>
        </div>
      )}
    </header>
  )
}
