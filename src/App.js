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
        <Route path='/signup' element={token ? <Projects /> : <Signup />} />
        <Route path='/signin' element={token ? <Projects /> : <Login />} />
        <Route />
      </Routes>
    </>
  )
}

export default App
