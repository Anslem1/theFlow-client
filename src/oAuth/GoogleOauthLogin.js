import { GoogleLogin } from '@react-oauth/google'
import jwtDecode from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { SigninUser } from '../Redux/actions'

function GoogleOauthLogin () {
  const dispatch = useDispatch()

  const onSuccess = response => {

    const userInfo = jwtDecode(response.credential)

    const user = {
      email: userInfo.email,
      password: userInfo.sub
    }

    dispatch(SigninUser(user))
  }

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_CLIENT_ID}
      onSuccess={onSuccess}
      onFailure={console.error}
    />
  )
}

export default GoogleOauthLogin
