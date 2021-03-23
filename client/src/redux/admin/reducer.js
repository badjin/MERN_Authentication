import {
  GETUSERS_SUCCESS,
  GETUSERS_FAILURE
} from './types'

const initialState = {
  users: [],
  errorMessage: ''
}


const adminReducer = (state=initialState, action) => {
  switch(action.type){
      case GETUSERS_SUCCESS:      
        return { 
          ...state, 
          users: action.payload, 
          errorMessage: ''
        }

      case GETUSERS_FAILURE:
        return { 
          state: initialState
        }
      
      default:
        return state;
  }
}

export default adminReducer