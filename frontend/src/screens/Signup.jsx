import React, { useState, useContext, useEffect} from 'react'
import { registerUser, checkCurrentUser, fetchUser } from '../apis/api'
import { Link, useNavigate } from 'react-router-dom'
import { LoginContext } from '../context/DataProvider'


const Signup = () => {
    const navigate = useNavigate()
    const { user, setUser } = useContext(LoginContext);

    useEffect(() => {
      const checkUserStatus = async () => {
        var response = await checkCurrentUser();
        if (!response.data.message) {
          var response2 = await fetchUser(response.data.id);
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
            setUser(data.user)
            navigate('/')
        }
    }
    }


  return (
    <section className=''>
        <h1 className='bg-primary small:text-[2rem] text-[10vw] underline text-center '>
            ShopAseZ.com
        </h1>
        <div className='border-[2px] border-yellow px-[1.5rem] py-[1rem] w-[90%] m-auto mt-[1rem]'>
            <h1 className='text-[1rem] text-center'>Create Account</h1>
            <div className='mt-[0.5rem]'>
                <label htmlFor='name' className=''>Name</label>
                <input type="text" id='name' placeholder='Enter your full name' name='name' className='px-[.5rem] py-[.2rem] w-[100%] text-[#162e44]' onChange={(e) => {updateSignup(e)}} required />
            </div>
            <div className='mt-[.5rem]'>
                <label htmlFor='mobile' className=''>Mobile Number</label>
                <input type="text" id='mobile' placeholder='XXXXXXXXXX' name='mobile' className='px-[.5rem] py-[.2rem] w-[100%] text-[#162e44]' onChange={(e) => {updateSignup(e)}}/>
            </div>
            <div className='mt-[.5rem]'>
                <label htmlFor='email' className=''>Email</label>
                <input type="email" id='email' placeholder='Enter a valid email' name='email' className='px-[.5rem] py-[.2rem] w-[100%] text-[#162e44]' onChange={(e) => {updateSignup(e)}}/>
            </div>
            <div className='mt-[.5rem]'>
                <label htmlFor='password' className='' >Password</label>
                <input type="password" id='password' name='password' className='px-[.5rem] py-[.2rem] w-[100%] text-[#162e44]' onChange={(e) => {updateSignup(e)}}/>
            </div>
            <div className='mt-[.5rem]'>
                <label htmlFor='cpassword' className='' >Confirm Password</label>
                <input type="password" id='cpassword' name='confirmPassword' className='px-[.5rem] py-[.2rem] w-[100%] text-[#162e44]' onChange={(e) => {updateSignup(e)}}/>
            </div>
            <div className='mt-[.5rem] flex justify-between items-center px-[1rem]'>
                <span htmlFor='' className='' >Sign up as:</span>
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
                Already have an account? <Link to="/login" className='text-tertiary'>Log In</Link>
            </p>
            <p className='text-center mt-[.5rem] text-[.6rem]'>
                By Creating an account with us, You agree to <span  className='text-tertiary'>Terms and Conditions</span>
            </p>
            <button><Link to='/' className='text-yellow'>Back To Home</Link></button>
        </div>
    </section>
  )
}

export default Signup