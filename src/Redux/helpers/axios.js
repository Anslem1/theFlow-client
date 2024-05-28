import axios from 'axios'
import { API } from './urlConfig'
import store from '../store'
import { authConstants, projectConstants } from '../actions/constants/constants'
import { signOutUser } from '../actions'

const token = localStorage.getItem('token')
const axioInstance = axios.create({
  baseURL: API,
  headers: { Authorization: token ? `Bearer ${token}` : '' }
})

axioInstance.interceptors.request.use(req => {
  const { auth } = store.getState()
  if (auth.token) {
    req.headers.Authorization = `Bearer ${auth.token}`
  }
  return req
})

axioInstance.interceptors.response.use(
  res => {
    return res
  }
  , error => {
    console.log({ error })
    switch (error?.response?.data?.error?.message) {
      case 'jwt expired':
        store.dispatch({
          type: authConstants.LOGOUT_SUCCESS
        })
        localStorage.clear()
        break
    }

    return Promise.reject(error)
  }
)

export default axioInstance
