import {
  GETUSERS_SUCCESS,
  GETUSERS_FAILURE
} from './types'

const initialState = {
  users: [],
  totalPages: 0,
  errorMessage: ''
}


const adminReducer = (state=initialState, action) => {
  switch(action.type){
      case GETUSERS_SUCCESS:      
        return { 
          ...state, 
          users: action.payload.users,
          totalPages: action.payload.totalPages,
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