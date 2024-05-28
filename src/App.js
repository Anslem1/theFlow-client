import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import './App.css'
import Login from './Pages/Login/Login'
import Signup from './Pages/Signup/Signup'
import Projects from './Pages/Projects/Projects'
import Projectdetails from './Pages/Projectdetails/Projectdetails'
import SearchPage from './Pages/SearchPage/SearchPage'
import { getProjects, isUserSignedin } from './Redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import CreateProject from './Pages/Createproject/Createproject'
import { useLocation } from 'react-router-dom'

import PasswordReset from './Pages/PasswordReset/PasswordReset'

function App () {
  const auth = useSelector(state => state.auth)
  const projects = useSelector(state => state.projects)
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (auth.authenticated) {
      token && dispatch(getProjects())
    } else {
      dispatch(isUserSignedin())
    }
  }, [auth.authenticated])
  const locate = useLocation()
  if (locate.pathname === '/') {
    localStorage.removeItem('updateProject')
  }

  return (
    <>
      <Navbar search={search} setSearch={setSearch} />
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
          path='/project/search'
          element={token ? search ? <SearchPage /> : <Projects /> : <Login />}
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
