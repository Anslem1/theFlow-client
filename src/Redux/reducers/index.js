import { combineReducers } from 'redux'
import AuthReducer from './Auth/AuthReducer'
import ProjectReducer from './Project/ProjectReducer'

const rootReducer = combineReducers({
  auth: AuthReducer,
  projects: ProjectReducer
})

export default rootReducer
