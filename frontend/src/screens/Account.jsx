import React, { useContext, useEffect } from 'react'
import Header from '../components/Header';
import { Outlet, useNavigate } from 'react-router';
import { LoginContext } from '../context/DataProvider';
import { checkCurrentUser, fetchUser } from '../apis/api';
import { NavLink } from 'react-router-dom';

const Account = () => {
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
        }
        else {
            navigate('/login')
        }
      };
      checkUserStatus();
    }, []);

  return (<div>
    {/* <div>
        <Header/>
    </div> */}
    <section className='bg-green-600'>
      <div>
        <div className="user-dashboard">
          <div>User Dashboard</div>
          <button><NavLink to="/account">Profile</NavLink></button> 
          <button><NavLink to="/account/orderHistory">Order History</NavLink></button>
        </div>
        {
          user.role === "seller" && <div className="seller-dashboard">
            <div>Seller Dashboard</div>
            <button><NavLink to='/account/products'>Manage Products</NavLink></button>
            <button><NavLink to="/account/orders">Manage Orders</NavLink></button>
          </div>
        }
      </div>
      <div className="content">
        
      </div>
    </section>
    <Outlet/>
  </div>);
}

export default Account