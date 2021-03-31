import {
  SET_BGIMAGES,
  SET_CURRENT_BG_IMAGE
} from './types'

const initialState = {
  bgImages: [],
  isLoading: false,
  errorMessage: '',
  currentBgImage: ''
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

      case SET_CURRENT_BG_IMAGE:
        return {
          ...state,
          currentBgImage: action.payload
        }
      
      default:
        return state;
  }
}

export default bgImageReducer