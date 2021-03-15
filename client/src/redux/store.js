import rootReducer from './rootReducer'
import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'
import reduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const middleware = [promiseMiddleware, reduxThunk]
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)))
// const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

// const store = createStoreWithMiddleware(
//   rootReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ &&
//   window.__REDUX_DEVTOOLS_EXTENSION__()
// )

export default store