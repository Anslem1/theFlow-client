import React, { useEffect } from 'react'
import './Signup.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SignUpUser } from '../../Redux/actions'
import { Link } from 'react-router-dom'
import RenderLoading from '../../Components/LoadingPage/RenderLoading'

function Signup () {
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
    const auth = useSelector(state => state.auth)

  function userSignUp (e) {
    e.preventDefault()
    const user = {
      username,
      email,
      password
    }
    dispatch(SignUpUser(user))
  }
useEffect(() => {
  auth.error && setError(true)
  setTimeout(() => {
    setError(false)
  }, 3000)
}, [auth.authenticating])


  return (
    <>
      <main className='main'>
        <RenderLoading />
        <div>
          <h1>Keep track of your projects with theFlow</h1>
        </div>

        <form onSubmit={userSignUp} className='signup-container'>
          <div>
            <h1>Signup to Theflow</h1>
            <div className='input-container'>
              <label htmlFor='email'>Email</label>
              <input
                type='text'
                placeholder='yagami@example.com'
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='input-container'>
              <label htmlFor='email'>Username</label>
              <input
                type='text'
                placeholder='Ryuk'
                value={username}
                onChange={e => setUsername(e.target.value)}
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
            <button>Sign up</button>
          </div>
          {error && <p className='is-error'>{auth.error}</p>}
        

          <p className='is-new'>
            Have an account on theFlow? <Link to='/signin'>Sign in</Link>
          </p>
        </form>
      </main>
    </>
  )
}

export default Signup
