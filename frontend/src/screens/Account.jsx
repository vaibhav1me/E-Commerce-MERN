import React, { useContext, useEffect } from 'react'
import Header from '../components/Header';
import { useNavigate } from 'react-router';
import { LoginContext } from '../context/DataProvider';
import { checkCurrentUser, fetchUser } from '../apis/api';

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
    <div>
        <Header/>
    </div>
  </div>);
}

export default Account