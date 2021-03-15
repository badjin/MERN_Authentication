import axios from 'axios'
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_USER,
  REGISTER_USER,
  GET_USER
} from './types'
// import { isAuth } from '../helpers/auth'

// export const registerUser = (dataToSubmit) => {
//     const request = axios.post(`${process.env.REACT_APP_API_URL}/register`,dataToSubmit)
//       .then(response => response.data)
    
//     return {
//       type: REGISTER_USER,
//       payload: request
//     }
// }

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
    // const request = axios.post(`${process.env.REACT_APP_API_URL}/login`,dataToSubmit)
    // .then(res => {
    //   console.log(res.data.user)
    //   return res.data.user
    // })
    // .catch(err => err.response.data)  

    // return {
    //   type: LOGIN_USER,
    //   payload: request
    // }
}

// export const loginGoogle = (dataToSubmit) => {
//   return (dispatch) => {
//     return new Promise((resolve, reject) => {
//       axios.post(`${process.env.REACT_APP_API_URL}/googlelogin`,dataToSubmit)
//       .then( res => {
//         dispatch(loginSuccess(res.data))
//         resolve(res.data)
//       })
//       .catch(error => {
//         dispatch(loginFailure(error.response.data))
//         reject(error.response.data.error)
//       })
//     })      
//   }
  // const request = axios.post(`${process.env.REACT_APP_API_URL}/login`,dataToSubmit)
  // .then(res => {
  //   console.log(res.data.user)
  //   return res.data.user
  // })
  // .catch(err => err.response.data)  

  // return {
  //   type: LOGIN_USER,
  //   payload: request
  // }
// }
// export const getUser = () => {

//     // const request = axios.get(`${process.env.REACT_APP_API_URL}/user/${isAuth().id}`)
//     // .then(response => response.data)

//     const user = isAuth()
//     let payload
//     if (!user) payload = ''
//     return {
//       type: GET_USER,
//       payload: isAuth()
//     }
// }



