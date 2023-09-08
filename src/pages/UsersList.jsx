import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

import { BASE_URL } from '../utils/constants'
import AdminLayout from '../components/AdminLayout';
import userListApi from '../api/userListApi';

const UsersList = () => {

    const [users,setUsers] = useState([])
    
    useEffect(()=>{
      const fetchUsers =async ()=>{
        try {
            const data = await userListApi();
            setUsers(data);
          } catch (error) {
            console.error(error);
          }
    };
      fetchUsers();
    },[]);
  
    const blockUser = async (id) => {
      const accessToken = localStorage.getItem('access_token');
      try {
          const response = await fetch(`${BASE_URL}/blockuser/${id}`, {
            method:'GET',
            headers:{
              Accept: 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          })
          console.log(response)
          setUsers((prevUsers) =>
              prevUsers.map((user) =>
                  user.id === id ? { ...user, is_active: !user.is_active } : user
              )
          );
          toast.success('Blocked/Unblocked a User',{
            position:'top-center',
          })
      } catch {
          console.log("error")
  
      }
  
  
  }

  return (
    <AdminLayout title="Admin | User Management" content="User Management">
        <div className="p-4 ">
          <div className='flex justify-center items-center bg-gray-400 h-20 my-4'>
          <h1 className='font-sans font-extrabold text-xl'>Users List</h1>
          </div>
          <table className="table-auto w-full border-collapse border border-gray-300 shadow-md">
            <thead className="bg-gray-700">
              <tr className="">
                <th className="px-4 py-2  text-white ">Image</th>
                <th className="px-4 py-2  text-white ">Username</th>
                <th className="px-4 py-2  text-white ">Email</th>
                <th className="px-4 py-2  text-white ">Name</th>
                <th className="px-4 py-2  text-white ">Action</th>
              </tr>
            </thead>

            <tbody>
              {users?.map((item) => (
                <tr key={item.id} className="bg-gray-100 text-center ">
                  <td className=" flex justify-center px-4 py-2 "><img className='w-16 h-16 rounded-full' alt={item.username} src={`${BASE_URL}${item.display_pic}`}/></td>
                  <td className=" px-4 py-2 ">{item.username}</td>
                  <td className="px-4 py-2 ">{item.email}</td>
                  <td className="px-4 py-2 ">{item.first_name} {item.last_name}</td>
                  <td className="px-4 py-2 ">
                    
                  {item.is_active ? (
                  <button className="bg-gray-500 rounded-md p-2 text-white font-bold hover:bg-red-600 relative" onClick={() => blockUser(item.id)}>Block</button>
                  ) : (
                  <button className="bg-gray-500 rounded-md p-2 text-white font-bold hover:bg-green-600 relative" onClick={() => blockUser(item.id)}>unblock</button>
                  )}     
                  </td>
                </tr>
               ))} 
            </tbody>
          </table>
        </div>
        </AdminLayout>
  )
}

export default UsersList