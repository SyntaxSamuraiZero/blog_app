import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import Header from '../Header'
import ArticlesList from '../ArticlesList'
import ArticlePage from '../ArticlePage'
import SignIn from '../SignIn'
import SignUp from '../SignUp'
import CreateArticle from '../CreateArticle'
import EditArticle from '../EditArticle'
import EditProfile from '../EditProfile'
import getUser from '../../services/getUser'
import Loading from '../Loading'
import Error from '../Error'
import PrivateRoute from '../PrivateRoute'

import './App.scss'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      setIsAuthenticated(true)
      getUser(setUser, setLoading, setError)
    } else {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error error={error} />
  }

  return (
    <div className='app'>
      <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} user={user} setUser={setUser} />
      <main className='main'>
        <Routes>
          <Route path='/' element={<ArticlesList isAuthenticated={isAuthenticated} />} />
          <Route path='/articles' element={<ArticlesList isAuthenticated={isAuthenticated} />} />
          <Route path='/articles/:slug' element={<ArticlePage user={user} isAuthenticated={isAuthenticated} />} />
          <Route path='/sign-in' element={<SignIn setUser={setUser} setIsAuthenticated={setIsAuthenticated} />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route
            path='/new-article'
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <CreateArticle />
              </PrivateRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <EditProfile user={user} setUser={setUser} />
              </PrivateRoute>
            }
          />
          <Route
            path='/articles/:slug/edit'
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <EditArticle />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </div>
  )
}
