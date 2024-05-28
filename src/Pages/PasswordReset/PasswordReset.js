import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import RenderLoading from '../../Components/LoadingPage/RenderLoading';
import { forgotPassword } from '../../Redux/actions'
import './PasswordReset.css'

function PasswordReset () {
  const [email, setEmail] = useState('')
  const [error, setError] = useState(false)

  const dispatch = useDispatch()

  const auth = useSelector(state => state.auth)

  function userForgotPassword (e) {
    e.preventDefault()
    dispatch(forgotPassword({ email }))
  }

  return (
    <>
      <div className='reset-password-container'>
        <RenderLoading />
        <div className='reset-password-content'>
          <h2>Reset password</h2>
          <form className='input-container' onSubmit={userForgotPassword}>
            <label htmlFor='email'>Email Address</label>
            <input
              type='text'
              placeholder='yagami@example.com'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button>Submit</button>
          </form>
          <Link to='/signin' className='reset-signin'>
            Signin?
          </Link>
        </div>
        <div>
          {auth.resetError && (
            <p className='is-new reset-infos'>{auth.resetError}</p>
          )}
          {auth.message && <p className='is-new reset-infos'>{auth.message}</p>}
        </div>
      </div>
    </>
  )
}

export default PasswordReset
