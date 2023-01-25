import { GoogleLogin } from '@react-oauth/google'
import jwtDecode from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { SignUpUser } from '../Redux/actions'

function GoogleOauthSignUp () {
  const dispatch = useDispatch()

  const onSuccess = response => {
    const userInfo = jwtDecode(response.credential)
    const user = {
      username: userInfo.given_name,
      email: userInfo.email,
      password: userInfo.sub
    }

    dispatch(SignUpUser(user))
  }

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_CLIENT_ID}
      onSuccess={onSuccess}
      onFailure={console.error}
      render={({ onClick }) => (
        <button onClick={onClick}>Sign Up with Google</button>
      )}
    />
  )
}

export default GoogleOauthSignUp
