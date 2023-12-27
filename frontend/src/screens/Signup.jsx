import React, { useState, useContext, useEffect} from 'react'
import { registerUser, checkCurrentUser, fetchUser } from '../apis/api'
import { Link, useNavigate } from 'react-router-dom'
import { LoginContext } from '../context/DataProvider'
import Cookies from 'js-cookie'


const Signup = () => {
    const navigate = useNavigate()
    const { user, setUser } = useContext(LoginContext);

    useEffect(() => {
      const checkUserStatus = async () => {
        var response = await checkCurrentUser();
        if (!response.data.message) {
          var response2 = await fetchUser(response.data.id);
        //   console.log(response);
        //   console.log(response2.data.user);
          setUser(response2.data.user);
          navigate('/')
        }
      };
      checkUserStatus();
    }, []);
    
    const [signup, setSignup] = useState({name: '', email: '', password: '', mobile: '', role: ''})
    const [message, setMessage] = useState('')

    const updateSignup = (e) => {
        setSignup({...signup, [e.target.name]: e.target.value})
    }

    const signupUser = async () => {
        setMessage("");
        if (signup.confirmPassword != signup.password) {
            setMessage("Both passwords should match")
        }
        else {
        let response = await registerUser(signup)
        const data = response.data
        if (data.message != "User created successfully") {
            setMessage(data.message)
        }
        else {
            localStorage.setItem("jwt", data.token);
            // Cookies.set("jwt", data.token, {path: '/'})
            setUser(data.user)
            navigate('/')
        }
    }
    }


  return (
    <div className='bg-[#000000] w-[50%] p-[1rem] rounded-[1.5rem]'>
        <h1 className='text-[2rem] underline text-center '>
            ShopAseZ.com
        </h1>
        <div className='border-[2px] px-[1.5rem] py-[1rem] w-[90%] m-auto mt-[1rem]'>
            <h1 className='text-[1rem] text-center'>Create Account</h1>
            <div className='mt-[0.5rem]'>
                <h2 className=''>Name</h2>
                <input type="text" placeholder='Enter your full name' name='name' className='px-[.5rem] py-[.2rem] w-[100%] text-[#162e44]' onChange={(e) => {updateSignup(e)}} required />
            </div>
            <div className='mt-[.5rem]'>
                <h2 className=''>Mobile Number</h2>
                <input type="text" placeholder='XXXXXXXXXX' name='mobile' className='px-[.5rem] py-[.2rem] w-[100%] text-[#162e44]' onChange={(e) => {updateSignup(e)}}/>
            </div>
            <div className='mt-[.5rem]'>
                <h2 className=''>Email</h2>
                <input type="email" placeholder='Enter a valid email' name='email' className='px-[.5rem] py-[.2rem] w-[100%] text-[#162e44]' onChange={(e) => {updateSignup(e)}}/>
            </div>
            <div className='mt-[.5rem]'>
                <h2 className='' >Password</h2>
                <input type="password" name='password' className='px-[.5rem] py-[.2rem] w-[100%] text-[#162e44]' onChange={(e) => {updateSignup(e)}}/>
            </div>
            <div className='mt-[.5rem]'>
                <h2 className='' >Confirm Password</h2>
                <input type="password" name='confirmPassword' className='px-[.5rem] py-[.2rem] w-[100%] text-[#162e44]' onChange={(e) => {updateSignup(e)}}/>
            </div>
            <div className='mt-[.5rem] flex justify-between items-center px-[1rem]'>
                <h2 className='' >Sign up as:</h2>
                <span>
                <label htmlFor="user">User</label>
                <input type="radio" name="role" id="user" value="user" onChange={(e) => updateSignup(e)}/>
                </span>
                <span>
                <label htmlFor="seller">Seller</label>
                <input type="radio" name="role" id="seller" value="seller" onChange={(e) => updateSignup(e)}/>
                </span>
            </div>
            <div className='mt-[.5rem]'>
                <div className='text-center'>
                    <button className='bg-white text-[#162e44] px-[.5rem] py-[.2rem]' onClick={() => {signupUser()}}>Continue</button>
                {message && <div className='text-[#FF0000] mt-[1rem]'>{message}</div>}
                </div>
            </div>
            <p className='text-center mt-[.5rem]'>
                Already have an account? <Link to="/login" className='text-[#70ace3]'>Log In</Link>
            </p>
            <p className='text-center mt-[.5rem] text-[.6rem]'>
                By Creating an account with us, You agree to <span href="" className='text-[#70ace3]'>Terms and Conditions</span>
            </p>
            <button><Link to='/'>Back To Home</Link></button>
        </div>
    </div>
  )
}

export default Signup