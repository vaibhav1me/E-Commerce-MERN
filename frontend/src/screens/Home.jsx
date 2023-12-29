import Header from '../components/Header'
import { useEffect, useContext } from 'react'
import { checkCurrentUser, fetchUser } from '../apis/api'
import { LoginContext } from '../context/DataProvider'
import { Outlet } from 'react-router'


const Home = () => {
  const { user, setUser } = useContext(LoginContext);

  useEffect(() => {
    const checkUserStatus = async () => {
      var response = await checkCurrentUser()
      if (!response.data.message) {
        var response2 = await fetchUser(response.data.id)
        // console.log(response)
        // console.log(response2.data.user)
        setUser(response2.data.user)
      }
    }
    checkUserStatus()
  },[])

  return (
    <>
      <Header />
      <Outlet/>
    </>
  );
}

export default Home