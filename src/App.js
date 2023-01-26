import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import './App.css'
import Login from './Pages/Login/Login'
import Signup from './Pages/Signup/Signup'
import Projects from './Pages/Projects/Projects'
import Projectdetails from './Pages/Projectdetails/Projectdetails'
import { getProjects, isUserSignedin } from './Redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import CreateProject from './Pages/Createproject/Createproject'
import { gapi } from 'gapi-script'
import PasswordReset from './Pages/PasswordReset/PasswordReset'

function App () {
  const auth = useSelector(state => state.auth)
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()

  useEffect(() => {
    if (auth.authenticated) {
      token && dispatch(getProjects())
    } else {
      dispatch(isUserSignedin())
    }
  }, [auth.authenticated])

  // useEffect(() => {
  //   function start () {
  //     gapi.client
  //       .init({
  //         clientId: process.env.REACT_APP_CLIENT_ID,
  //         // scope: [
  //         //   'https://www.googleapis.com/auth/userinfo.profile',
  //         //   'https://www.googleapis.com/auth/userinfo.email'
  //         // ]
  //         scope: 'profile email'
  //       })

  //   }
  //   gapi.load('auth2', start)
  // }, [])

  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path='/' element={token ? <Projects /> : <Login />} />
        <Route
          path='/product-details/:name/:id'
          element={token ? <Projectdetails /> : <Login />}
        />
        <Route
          path='/project/create'
          element={token ? <CreateProject /> : <Login />}
        />
        <Route
          path='/reset'
          element={token ? <Projects /> : <PasswordReset />}
        />
        <Route path='/signup' element={token ? <Projects /> : <Signup />} />
        <Route path='/signin' element={token ? <Projects /> : <Login />} />
        <Route />
      </Routes>
    </>
  )
}

export default App
