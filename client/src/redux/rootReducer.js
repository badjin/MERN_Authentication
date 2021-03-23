import { combineReducers } from 'redux'
import userReducer from './user/reducer'
import bgImageReducer from './bgImage/reducer'
import adminReducer from './admin/reducer'

const rootReducer = combineReducers({
  user: userReducer,
  bgImage: bgImageReducer,
  admin: adminReducer
})

export default rootReducer