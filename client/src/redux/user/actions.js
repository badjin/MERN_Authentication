import axios from 'axios'
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS
} from './types'

import { signout } from '../../helpers/auth'

// export const registerUser = (dataToSubmit) => {
//     const request = axios.post(`${process.env.REACT_APP_API_URL}/register`,dataToSubmit)
//       .then(response => response.data)
    
//     return {
//       type: REGISTER_USER,
//       payload: request
//     }
// }

const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}

const loginSuccess = (loginData) => {
  return {
    type: LOGIN_SUCCESS,
    payload: loginData
  }
}

const loginFailure = (errorMessage) => {
  return {
    type: LOGIN_FAILURE,
    payload: errorMessage
  }
}

export const loginUser = (dataToSubmit, endPoint) => {
    return (dispatch) => {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.REACT_APP_API_URL}/${endPoint}`,dataToSubmit)
        .then( res => {
          dispatch(loginSuccess(res.data))
          resolve(res.data)
        })
        .catch(error => {
          dispatch(loginFailure(error.response.data))
          reject(error.response.data.error)
        })
      })      
    }
}

export const logoutUser = () => {
  return (dispatch) => {
    return new Promise((resolve) => {
      signout()
      dispatch(logoutSuccess())
      resolve(true)
    })
  }
}
export const getUser = () => {

    // const request = axios.get(`${process.env.REACT_APP_API_URL}/user/${isAuth().id}`)
    // .then(response => response.data)

    // const user = isAuth()
    // let payload
    // if (!user) payload = ''
    // return {
    //   type: GET_USER,
    //   payload: isAuth()
    // }
}



