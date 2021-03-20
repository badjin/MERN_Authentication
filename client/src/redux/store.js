import rootReducer from './rootReducer'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const middleware = [reduxThunk]
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)))

export default store
