import axios from 'axios'
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  GETDATA_SUCCESS,
  SEND_ACTIVATION_EMAIL,
  SEND_ACTIVATION_EMAIL_FAILURE,
  ACTIVATION_USER,
  ACTIVATION_USER_FAILURE
} from './types'

import { signout, getLoginInfo } from '../../helpers/auth'
import { clearUsersData } from '../admin/actions'


export const registerUser = (dataToSubmit) => {
  return (dispatch) => {
    return new Promise ((resolve, reject) => {
      axios.post(`${process.env.REACT_APP_API_URL}/register`,dataToSubmit)
      .then(res => {
        dispatch({
          type: SEND_ACTIVATION_EMAIL
        })
        resolve(res.data.message)
      })
      .catch(error => {
        dispatch({
          type: SEND_ACTIVATION_EMAIL_FAILURE
        })
        reject(error.response.data.error)
      })
    })
  }
}

export const activationUser = (dataToSubmit) => {
  return (dispatch) => {
    // console.log(dataToSubmit)
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.REACT_APP_API_URL}/activation`,dataToSubmit)
      .then( res => {
        dispatch({
          type: ACTIVATION_USER,
          payload: res.data
        })
        resolve(res.data)
      })
      .catch(error => {
        dispatch({
          type: ACTIVATION_USER_FAILURE,
          payload: error.response.data
        })
        reject(error.response.data.error)
      })
    })      
  }
}

const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}

const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error
  }
}

export const loginUser = (dataToSubmit, endPoint) => {
    return (dispatch) => {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.REACT_APP_API_URL}/${endPoint}`,dataToSubmit)
        .then( res => {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
          })
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
      if (getLoginInfo()) {
        signout()
        dispatch(logoutSuccess())
        dispatch(clearUsersData())
        resolve(true)
      } 
    })
  }
}

export const updateLoginUser = (user) => {  
  return {
    type: GETDATA_SUCCESS,
    payload: user
  }
}

export const updateProfile = (user, token) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.put(`${process.env.REACT_APP_API_URL}/user/update/`, user, {
        headers: {
            Authorization: `Bearer ${token}`
        }
      })
      .then( res => {
        dispatch({
          type: GETDATA_SUCCESS,
          payload: res.data
        })
        resolve(true)
      })
      .catch(error => {        
        reject(error)
      })
    })      
  }
}
// export const getUser = ({id, token}) => { 
//   return (dispatch) => {
//     return new Promise((resolve, reject) => {

//       axios.get(`${process.env.REACT_APP_API_URL}/user/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       })
//       .then(res => {
//         dispatch(updateUserData(res.data))
//         resolve(res.data)
//       })
//       .catch(error => {
//         if(error.response === undefined){
//           console.log(error.config.url)
//         } else {
//           reject(error.response.data.error)
//         }
//       })
//     })
//   }  
// }


