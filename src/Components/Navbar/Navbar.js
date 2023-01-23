import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getProjectBySearchParam, signOutUser } from '../../Redux/actions'
import RenderLoading from '../LoadingPage/RenderLoading'
import './Navbar.css'

function Navbar () {
  const navigate = useNavigate()

  const [search, setSearch] = useState('')

  const token = localStorage.getItem('token')
  const dispatch = useDispatch()
  function signOut () {
    dispatch(signOutUser())
  }

  function searchByParams () {
    dispatch(getProjectBySearchParam(search, navigate))

    return
  }

  return (
    <nav>
      <p>
        <Link to='/'>
          <span>the</span>Flow
        </Link>
      </p>
      {token && (
        <>
          <div>
            <input
              type='text'
              onChange={e => setSearch(e.target.value)}
              className='search-input'
              value={search}
              onKeyDown={e => e.code === 'Enter' && searchByParams()}
            />
            <i
              className='fa-brands fa-searchengin'
              onClick={searchByParams}
            ></i>
          </div>
        </>
      )}
      {token && <button onClick={signOut}>Logout</button>}
    </nav>
  )
}

export default Navbar
