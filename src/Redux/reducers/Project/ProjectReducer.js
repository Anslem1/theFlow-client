import { projectConstants } from '../../actions/constants/constants'

const initialState = {
  projects: [],
  projectBySearch: [],
  project: {},
  error: null,
  message: null,
  loading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case projectConstants.ADD_PROJECT_REQUEST:
      state = {
        ...state,
        loading: true
      }
      break
    case projectConstants.ADD_PROJECT_SUCCESS:
      state = {
        ...state,
        project: action.payload.project,
        loading: false
      }
      break
    case projectConstants.ADD_PROJECT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false
      }
      break
    case projectConstants.GET_PROJECT_DETAILS_BY_SEARCH_REQUEST:
      state = {
        ...state,
        loading: true
      }
      break
    case projectConstants.GET_PROJECT_DETAILS_BY_SEARCH_SUCCESS:
      state = {
        ...state,
        projectBySearch: action.payload.projectBySearch,
        loading: false
      }
      break
    case projectConstants.GET_PROJECT_DETAILS_BY_SEARCH_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false
      }
      break
    case projectConstants.GET_PROJECTS_REQUEST:
      state = {
        ...state,
        loading: true
      }
      break
    case projectConstants.GET_PROJECTS_SUCCESS:
      state = {
        ...state,
        projects: action.payload.projects,
        loading: false
      }
      break
    case projectConstants.GET_PROJECTS_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false
      }
      break
    case projectConstants.GET_PROJECT_DETAILS_BY_ID_REQUEST:
      state = {
        ...state,
        loading: true
      }
      break
    case projectConstants.GET_PROJECT_DETAILS_BY_ID_SUCCESS:
      state = {
        ...state,
        project: action.payload.project,
        loading: false
      }
      break
    case projectConstants.GET_PROJECT_DETAILS_BY_ID_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false
      }
      break
    case projectConstants.UPDATE_PROJECT_REQUEST:
      state = {
        ...state,
        loading: true
      }
      break
    case projectConstants.UPDATE_PROJECT_SUCCESS:
      state = {
        ...state,
        loading: false
      }
      break
    case projectConstants.UPDATE_PROJECT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false
      }
      break
    case projectConstants.DELETE_PROJECT_REQUEST:
      state = {
        ...state,
        loading: true
      }
      break
    case projectConstants.DELETE_PROJECT_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
        loading: false
      }
      break
    case projectConstants.DELETE_PROJECT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false
      }
      break
  }

  return state
}
