import React, { useContext, useEffect } from 'react'
import { LoginContext } from '../context/DataProvider';
import { useNavigate } from 'react-router';
import { checkCurrentUser, fetchUser } from '../apis/api';
import Header from '../components/Header';


const Cart = () => {
    const { user, setUser } = useContext(LoginContext);
    const navigate = useNavigate();

    useEffect(() => {
      const checkUserStatus = async () => {
        var response = await checkCurrentUser();
        if (!response.data.message) {
          var response2 = await fetchUser(response.data.id);
          // console.log(response);
          // console.log(response2.data.user);
          setUser(response2.data.user);
        } else {
          navigate("/login");
        }
      };
      checkUserStatus();
    }, []);
    
  return (
    <div>
        <div>
            <Header/>
        </div>
    </div>
  )
}

export default Cart