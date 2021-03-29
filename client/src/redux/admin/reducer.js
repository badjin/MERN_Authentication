import {
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  GET_SETTINGS_SUCCESS,
  GET_SETTINGS_FAILURE,
  SET_SETTINGS_SUCCESS,
  SET_SETTINGS_FAILURE
} from './types'

const initialState = {
  users: [],
  totalPages: 0,
  errorMessage: '',
  settings: {
    db: 'MONGODB',
    theme: 'flowers'
  }
}


const adminReducer = (state=initialState, action) => {
  switch(action.type){
      case GET_USERS_SUCCESS:      
        return { 
          ...state, 
          users: action.payload.users,
          totalPages: action.payload.totalPages,
          errorMessage: ''
        }

      case GET_USERS_FAILURE:
        return { 
          ...state, 
          users: '',
          totalPages: 0,
          errorMessage: ''
        }
      
      case SET_SETTINGS_SUCCESS:
      case GET_SETTINGS_SUCCESS:
        return {
          ...state,
          settings: action.payload
        }

      case SET_SETTINGS_FAILURE:
      case GET_SETTINGS_FAILURE:
        return {
          ...state,
          settings: {
            db: 'MONGODB',
            theme: 'flowers'
          }
        }

      default:
        return state;
  }
}

export default adminReducer