import {
  authConstants,
  userSignUpConstants
} from '../../actions/constants/constants'

const initialState = {
  token: null,
  user: {
    username: '',
    email: '',
    password: '',
    userProfilePicture: ''
  },
  authenticated: false,
  authenticating: false,
  signingOut: false,
  signedOut: false,
  error: null,
  resetError: null,
  passwordReset: false,
  message: ''
}

export default (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
        authenticated: false
      }
      break
    case authConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticating: false,
        authenticated: true
      }
      break
    case authConstants.LOGIN_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        authenticating: false,
        authenticated: false
      }
      break
    case userSignUpConstants.USER_SIGNUP_REQUEST:
      state = {
        ...state,
        authenticating: true,
        authenticated: false
      }
      break
    case userSignUpConstants.USER_SIGNUP_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticating: false,
        authenticated: true
      }
      break
    case userSignUpConstants.USER_SIGNUP_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        authenticated: false,
        authenticating: false
      }
      break
    case authConstants.LOGOUT_REQUEST:
      state = {
        ...state,
        signingOut: true,
        signedOut: false
      }
      break
    case authConstants.LOGOUT_SUCCESS:
      state = {
        ...initialState,
        signingOut: false,
        signedOut: true
      }
      break
    case authConstants.LOGOUT_FAILURE:
      state = {
        ...state,
        signingOut: false,
        signedOut: false,
        error: action.payload.error
      }
      break
    case authConstants.RESET_PASSWORD_REQUEST:
      state = {
        ...state,
        loading: true,
        passwordReset: false
      }
      break
    case authConstants.RESET_PASSWORD_SUCCESS:
      state = {
        ...state,
        loading: false,
        passwordReset: true,
        resetError: null,
        message: action.payload.message
      }
      break
    case authConstants.RESET_PASSWORD_FAILURE:
      state = {
        ...state,
        message: '',
        loading: false,
        resetError: action.payload.error
      }
      break
  }
  return state
}
