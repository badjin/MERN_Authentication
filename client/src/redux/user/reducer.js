import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  GETDATA_SUCCESS,
  SEND_ACTIVATION_EMAIL,
  SEND_ACTIVATION_EMAIL_FAILURE,
  ACTIVATION_USER,
  ACTIVATION_USER_FAILURE
} from './types';

const initialState = {
  userData: '',
  isLogin: false,
  errorMessage: ''
}


const userReducer = (state=initialState, action) => {
  switch(action.type){
      case SEND_ACTIVATION_EMAIL:
      case SEND_ACTIVATION_EMAIL_FAILURE:
        return { 
          state: initialState
        }
      
      case ACTIVATION_USER:
      case GETDATA_SUCCESS:        
      case LOGIN_SUCCESS:
        return { 
          ...state, 
          userData: action.payload.user, 
          isLogin: action.payload.success,
          errorMessage: ''
        }

      case ACTIVATION_USER_FAILURE:
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
      
      default:
        return state;
  }
}

export default userReducer