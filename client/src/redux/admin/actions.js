import axios from 'axios'
import {
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  GET_SETTINGS_SUCCESS,
  GET_SETTINGS_FAILURE,
  SET_SETTINGS_SUCCESS,
  SET_SETTINGS_FAILURE
} from './types'

export const getUsers = (page, token) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.get(`${process.env.REACT_APP_API_URL}/admin/users?page=${page}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
      })
      .then( res => {
        dispatch({
          type: GET_USERS_SUCCESS,
          payload: res.data
        })
        resolve(res.data)
      })
      .catch(error => {
        dispatch({
          type: GET_USERS_FAILURE
        })
        reject(error)
      })
    })      
  }
}

export const getSettings = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.get(`${process.env.REACT_APP_API_URL}/settings`)
      .then( res => {
        dispatch({
          type: GET_SETTINGS_SUCCESS,
          payload: res.data.settings
        })
        resolve(res.data.settings)
      })
      .catch(error => {
        dispatch({
          type: GET_SETTINGS_FAILURE
        })
        reject(error)
      })
    })      
  }
}

export const updateSettings = (payload, token) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.put(`${process.env.REACT_APP_API_URL}/admin/settings/update`, payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
      })
      .then( res => {
        dispatch({
          type: SET_SETTINGS_SUCCESS,
          payload
        })
        resolve(true)
      })
      .catch(error => {
        dispatch({
          type: SET_SETTINGS_FAILURE
        })
        console.log(error.response)
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
          type: GET_USERS_SUCCESS,
          payload: res.data
        })
        resolve(res.data)
      })
      .catch(error => {
        dispatch({
          type: GET_USERS_FAILURE
        })
        reject(error)
      })
    })      
  }
}

export const updateUser = (user, token) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.put(`${process.env.REACT_APP_API_URL}/admin/update/`, user, {
        headers: {
            Authorization: `Bearer ${token}`
        }
      })
      .then( res => {
        dispatch({
          type: GET_USERS_SUCCESS,
          payload: res.data
        })
        resolve(true)
      })
      .catch(error => {
        dispatch({
          type: GET_USERS_FAILURE
        })
        reject(error)
      })
    })      
  }
}


export const clearUsersData = () => {
  return {
    type: GET_USERS_FAILURE
  }
}