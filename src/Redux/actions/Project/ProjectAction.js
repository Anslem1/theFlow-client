import axios from '../../helpers/axios'
import { projectConstants } from '../constants/constants'

export function getProjects () {
  return async dispatch => {
    try {
      dispatch({ type: projectConstants.GET_PROJECTS_REQUEST })
      const res = await axios.get('/project/get')
      if (res.status === 200) {
        const { projects } = res.data
   

        dispatch({
          type: projectConstants.GET_PROJECTS_SUCCESS,
          payload: { projects }
        })
      }
    } catch (error) {
      console.log({ error, message: 'hehe' })
      dispatch({
        type: projectConstants.GET_PROJECTS_FAILURE,
        payload: {
          error:
            error.response.data.error.message || error.data.response.message
        }
      })
    }
  }
}

export function getProjectById (id) {
  return async dispatch => {
    try {
      dispatch({ type: projectConstants.GET_PROJECT_DETAILS_BY_ID_REQUEST })
      const res = await axios.get(`/project/get/${id}`)
      if (res.status === 200) {
        console.log(res.data.project)
        dispatch({
          type: projectConstants.GET_PROJECT_DETAILS_BY_ID_SUCCESS,
          payload: { project: res.data.project }
        })
      }
    } catch (error) {
      dispatch({
        type: projectConstants.GET_PROJECT_DETAILS_BY_ID_FAILURE,
        payload: { error: error.response.data.message }
      })
    }
  }
}
export function getProjectBySearchParam (search, navigate) {
  return async dispatch => {
    try {
      dispatch({ type: projectConstants.GET_PROJECT_DETAILS_BY_SEARCH_REQUEST })
      const res = await axios.get(`/project/get/search/${search}`)

      if (res.status === 200) {
        dispatch({
          type: projectConstants.GET_PROJECT_DETAILS_BY_SEARCH_SUCCESS,
          payload: { projects: res.data.project }
        })
        navigate('/')
      }
    } catch (error) {
      dispatch({
        type: projectConstants.GET_PROJECT_DETAILS_BY_SEARCH_FAILURE,
        payload: { error: error.response.data.message }
      })
    }
  }
}

export function addProject (form, navigate) {
  return async dispatch => {
    try {
      dispatch({ type: projectConstants.ADD_PROJECT_REQUEST })
      const res = await axios.post('/project/create', form)

      if (res.status === 200) {
        dispatch({
          type: projectConstants.ADD_PROJECT_SUCCESS,
          payload: { project: res.data.project }
        })
        dispatch(getProjects())
        dispatch(getProjectById(res.data.project._id))
        navigate(
          `/product-details/${res.data.project.projectName}/${res.data.project._id}`
        )
      }
    } catch (error) {
      console.log({ error })
      dispatch({
        type: projectConstants.ADD_PROJECT_FAILURE,
        payload: {
          error:
            error.response.data.message || error.response.data.error.message
        }
      })
    }
  }
}
export function updateProjectById (id, body, navigate) {
  return async dispatch => {
    try {
      dispatch({ type: projectConstants.UPDATE_PROJECT_REQUEST })
      const res = await axios.put(`/project/update/${id}`, body)

      if (res.status === 200) {
        dispatch({
          type: projectConstants.UPDATE_PROJECT_SUCCESS
        })
        dispatch(getProjects())
        navigate(
          `/product-details/${res.data.project.projectName}/${res.data.project._id}`
        )
        localStorage.removeItem('updateProject')
      }
    } catch (error) {
      console.log({ error })
      dispatch({
        type: projectConstants.UPDATE_PROJECT_FAILURE,
        payload: {
          error: error.response.data.error.message
        }
      })
    }
  }
}

export function deleteProjectById (id, navigate) {
  return async dispatch => {
    try {
      dispatch({ type: projectConstants.DELETE_PROJECT_REQUEST })
      const res = await axios.delete(`/project/delete/${id}`)

      if (res.status === 200) {
        console.log({ res })
        dispatch({
          type: projectConstants.DELETE_PROJECT_SUCCESS,
          payload: { message: res.data.message }
        })
        dispatch(getProjects())
        navigate('/')
      }
    } catch (error) {
      console.log({ error })
      dispatch({
        type: projectConstants.DELETE_PROJECT_FAILURE,
        payload: {
          error:
            error.response.data.message || error.response.data.error.message
        }
      })
    }
  }
}
