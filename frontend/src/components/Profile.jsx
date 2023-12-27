import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../context/DataProvider'
import { fetchUser, updateUser } from '../apis/api'

const Profile = () => {
  const {user, setUser} = useContext(LoginContext)
  const [values, setValues] = useState({mobile: "", address: ""})

  useEffect(() => {
    setValues({ mobile: user.mobile, address: user.address });
    console.log(user)
  },[user])

  useEffect(() => {
    console.log(values)
  }, [values])

  const changeUser = async (values) => {
    let response = await updateUser(user._id, values)
    setUser({...user, ...values})
    // console.log(response)
  }

  return (
    <div className='bg-green-500 text-black'>
        {
          // user.name, mobile, email, address, role :- user or seller avialble only when role is an user
        }
          <span>{user.name}</span>
          <span>{user.email}</span>
          <label htmlFor="mobile">Mobile</label>
          <input type="text" value={values.mobile} name='mobile' className='text-black' id='mobile' onChange={(e) => setValues({...values, [e.target.name]: e.target.value})}/>
          <label htmlFor="address">Address</label>
          <input type="text" value={values.address} name='address' className='text-black' id='address' onChange={(e) => setValues({...values, [e.target.name]: e.target.value})}/>
          {
            user.role === "user" && <button onClick={() => changeUser({role: "seller"})}>Become a Seller</button>
          }
          <button onClick={() => {changeUser(values)}}>Save Profile</button>
        
    </div>
  )
}

export default Profile