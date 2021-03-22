import axios from 'axios'
import {
  SET_BGIMAGES
} from './types'

export const setBgImages = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.get(`https://api.unsplash.com/search/photos/?query=flowers&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS}`)
      .then( res => {
        dispatch({
          type: SET_BGIMAGES,
          payload: res.data.results
        })
        resolve(true)
      })
      .catch(error => {
        reject(true)
      })
    })      
  }
}