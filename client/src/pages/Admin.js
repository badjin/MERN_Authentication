import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { getUsers, deleteUser } from '../redux'

import { getLoginInfo } from '../helpers/auth'
import Modal from '../components/Modal'

const TableRow = ({ user, index, onClick }) => {
  return (
    <tr className={`border-b border-gray-200 hover:bg-gray-100 ${(index%2 && 'bg-gray-50')}`}>
      <td className="hidden lg:block py-3 md:px-6 px-3 text-left whitespace-nowrap">
        <div className="flex items-center">          
          <span className="font-medium">{index+1}</span>
        </div>
      </td>
      <td className="py-3 md:px-6 px-3 text-left">
        <div className="flex items-center">
          <div className="mr-2">
            <img className="w-8 h-8 rounded-full" src={`${process.env.REACT_APP_API_URL}/uploads/${user.avatar}`} alt="Profile"/>
          </div>
          <span>{user.name}</span>
        </div>
      </td>
      <td className="hidden sm:block mt-2 py-3 md:px-6 px-3 text-center">
        
          <span className="">{user.email}</span>
      </td>
      <td className="py-3 md:px-6 text-center">
        <span className={`text-gray-100 ${user.role === 'admin' ? 'bg-yellow-600' : 'bg-purple-600'} py-1 px-3 rounded-full text-xs`}>{user.role}</span>
      </td>
      <td className="py-3 md:px-6 px-3 text-center">
        <div className="flex item-center justify-center">          
          <div className="w-4 mr-2 transform hover:text-yellow-500 hover:scale-125 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
          <button className="w-4 mr-2 transform hover:text-red-500 hover:scale-125 cursor-pointer" onClick={() => { onClick(user) }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  )
}

const Admin = () => {
  const users = useSelector(state => state.admin.users)
  const dispatch = useDispatch()
  const [usersData, setUsersData] = useState([]) 
  const [isModal, setIsModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState('')

  useEffect(() => {
    if(!users || !users.length){
      dispatch(getUsers(getLoginInfo().token))
      .then(res => {
        setUsersData(res)
      })
      .catch(error => toast.error(error.response.data.error))
    } else setUsersData(users)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const deleteSelectedUser = () => {    
    dispatch(deleteUser(selectedUser, getLoginInfo().token))
    .then(users => {
      setUsersData(users)
    })
    .catch(error => toast.error(error.response.data.error))
  }
  return (
    <div className='bj-container'>
      <div className="lg:w-full p-3 md:p-6">
        <div className="flex items-center justify-center bg-white font-sans overflow-hidden">
          <div className="w-full ">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="hidden lg:flex items-center py-3 md:px-6 px-3 text-left">ID</th>
                    <th className="py-3 md:px-6 px-3 text-left">Name</th>
                    <th className="hidden sm:block py-3 md:px-6 px-3 text-center">Email</th>
                    <th className="py-3 md:px-6 px-3 text-center">Role</th>
                    <th className="py-3 md:px-6 px-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">                  
                  { usersData.map((user, index) => {
                    return <TableRow key={index} user={user} index={index} onClick={(user) => {
                      setSelectedUser(user)
                      setIsModal(true)
                    }}/>
                  })}                 
                </tbody>
              </table>
              { isModal && 
                <Modal title={`Delete user ${selectedUser.name}`}               
                  confirmClick={() => {
                    deleteSelectedUser()
                    setIsModal(false)
                  }} 
                  cancelClick={() => setIsModal(false)} 
                /> 
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
