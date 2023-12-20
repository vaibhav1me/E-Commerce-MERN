import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate} from "react-router-dom"
import { authenticateLogin } from '../apis/api';
import { LoginContext } from '../context/DataProvider'

const Login = () => {
    const navigate = useNavigate()
    const { user, setUser } = useContext(LoginContext)

    /*----Work on this------ */
    // useEffect(() => {
    //   if (user) {
    //     navigate("/");
    //   }
    // }, []);

    const [ message, setMessage] = useState();
    const [ login, setLogin ] = useState({});

    const updateLogin = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
        // console.log(login)
    }

    const loginUser = async() => {
        setMessage('')
        let response = await authenticateLogin(login);
        // console.log(response.data)
        const data = response.data
        if (data.message != "Login Successful") {
            setMessage(data.message)
        }
        else {
            setUser(data.user)
            navigate('/')
        }
    }

  return (
    <div className='bg-[#000000] w-[40%] py-[2rem] px-[1rem] rounded-[1.5rem]'>
    <h1 className='text-[2rem] text-center underline'>
        ShopAseZ.com
    </h1>
    <div className='border-[2px] px-[1.5rem] py-[1rem] w-[90%] m-auto mt-[1rem]'>
        <h1 className='text-[1.5rem] text-center'>Welcome Buddy!</h1>
        <div className='mt-[1rem]'>
            <h2 className=''>Email</h2>
            <input type="email" placeholder='Enter a valid email' onChange={(e)=>{updateLogin(e)}} name='email' className='px-[.5rem] py-[.2rem] w-[100%] text-[#162e44]'/>
        </div>
        <div className='mt-[1rem]'>
            <h2 className='' >Password</h2>
            <input type="password" name='password' onChange={(e)=>{updateLogin(e)}} className='px-[.5rem] py-[.2rem] w-[100%] text-[#162e44]'/>
        </div>
        <div className='mt-[1rem]'>
            <div className='text-center'>
                <button className='bg-white text-[#162e44] px-[.5rem] py-[.2rem]' onClick={() => loginUser()}>Continue</button>
                {message && <div className='text-[#FF0000] mt-[1rem]'>{message}</div>}
            </div>
        </div>
        <p className='text-center mt-[1rem]'>
            Don't have an account? <Link to="/signup" className='text-[#70ace3]'>Create Account</Link>
        </p>
    </div>
</div>
  )
}

export default Login