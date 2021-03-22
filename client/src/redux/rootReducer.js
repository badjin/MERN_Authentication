import { combineReducers } from 'redux'
import userReducer from './user/reducer'
import bgImageReducer from './bgImage/reducer'

const rootReducer = combineReducers({
  user: userReducer,
  bgImage: bgImageReducer
})

export default rootReducer