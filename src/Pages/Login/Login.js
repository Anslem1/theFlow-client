import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SigninUser } from '../../Redux/actions'
import { Link } from 'react-router-dom'
import './Login.css'
import RenderLoading from '../../Components/LoadingPage/RenderLoading'

function Login () {
  const [email, setEmail] = useState('')
  const [error, setError] = useState(false)
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  function userSignIn (e) {
    e.preventDefault()
    const user = {
      email,
      password
    }
    dispatch(SigninUser(user))
  }

  useEffect(() => {
    auth.error && setError(true)
    setTimeout(() => {
      setError(false)
    }, 3000)
  }, [auth.authenticating])

  return (
    <main className='main'>
      <RenderLoading />
      <div style={{ marginLeft: '10px', marginRight: '10px' }}>
        <h1>Welcome back to theFlow</h1>
      </div>

      <div className='signup-container'>
        <form onSubmit={userSignIn}>
          <h1 style={{ fontFamily: 'raleway' }}>Login to Theflow</h1>
          <div className='input-container'>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              placeholder='E.g yagami@gmail.com'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='input-container'>
            <label htmlFor='email'>Password</label>
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button>Sign in</button>
        </form>

        {error && <p className='is-error'>{auth.error}</p>}

        <p className='is-new'>
          New to theFlow?{' '}
          <span>
            <Link to='/signup'>Sign up</Link>
          </span>
        </p>
      </div>
    </main>
  )
}

export default Login
