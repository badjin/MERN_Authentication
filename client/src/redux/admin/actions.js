import axios from 'axios'
import {
  GETUSERS_SUCCESS,
  GETUSERS_FAILURE
} from './types'

export const getUsers = (token) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.get(`${process.env.REACT_APP_API_URL}/admin/users/`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
      })
      .then( res => {
        dispatch({
          type: GETUSERS_SUCCESS,
          payload: res.data.users
        })
        resolve(res.data.users)
      })
      .catch(error => {
        dispatch({
          type: GETUSERS_FAILURE
        })
        reject(error)
      })
    })      
  }
}

export const deleteUser = (user, token) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.REACT_APP_API_URL}/admin/delete/`, user, {
        headers: {
            Authorization: `Bearer ${token}`
        }
      })
      .then( res => {
        dispatch({
          type: GETUSERS_SUCCESS,
          payload: res.data.users
        })
        resolve(res.data.users)
      })
      .catch(error => {
        dispatch({
          type: GETUSERS_FAILURE
        })
        reject(error)
      })
    })      
  }
}


export const clearUsersData = () => {
  return {
    type: GETUSERS_FAILURE
  }
}