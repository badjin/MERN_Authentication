import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  REGISTER_USER,
  GET_USER,
  LOGOUT_USER
} from './types';

const initialState = {
  userData: '',
  isLogin: false,
  errorMessage: ''
}


const userReducer = (state=initialState, action) => {
  switch(action.type){
      case REGISTER_USER:
          return {...state, register: action.payload }
      case LOGIN_SUCCESS:
          return { 
            ...state, 
            userData: action.payload.user, 
            isLogin: action.payload.success,
            errorMessage: ''
          }
      case LOGIN_FAILURE:
          return { 
            ...state, 
            errorMessage: action.payload.error, 
            isLogin: action.payload.success 
          }
      case LOGOUT_SUCCESS:
        return { 
          state: initialState
        }
      case GET_USER:
          return {...state, userData: action.payload }
      case LOGOUT_USER:
          return {...state, isLogin: false}
      default:
          return state;
  }
}

export default userReducer