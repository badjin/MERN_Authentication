import {
  SET_BGIMAGES
} from './types'

const initialState = {
  bgImages: [],
  isLoading: false,
  errorMessage: ''
}


const bgImageReducer = (state=initialState, action) => {
  switch(action.type){
      case SET_BGIMAGES:      
        return { 
          ...state, 
          bgImages: action.payload, 
          isLoading: false,
          errorMessage: ''
        }
      
      default:
        return state;
  }
}

export default bgImageReducer