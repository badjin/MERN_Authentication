import axios from 'axios'
import {
  SET_BGIMAGES,
  SET_CURRENT_BG_IMAGE
} from './types'

export const getBgImagesFromUnsplash = (theme) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.get(`https://api.unsplash.com/search/photos/?query=${theme}&per_page=20&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS}`)
      .then( res => {
        if(!res.data.total) {
          reject('No result from the api. Please try again with another keyword.')
        } else {
          dispatch({
            type: SET_BGIMAGES,
            payload: res.data.results
          })
          resolve(res.data.results)
        }        
      })
      .catch(error => {
        reject(error)
      })
    })      
  }
}

export const setCurrentBgImage = (image) => {
  return {
    type: SET_CURRENT_BG_IMAGE,
    payload: image
  }
}