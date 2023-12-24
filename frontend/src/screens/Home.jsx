import Header from '../components/Header'
import Banner from '../components/Banner'
import CategorySection from '../components/CategorySection'
import { useEffect, useContext } from 'react'
import { checkCurrentUser, fetchUser } from '../apis/api'
import { LoginContext } from '../context/DataProvider'


const Home = () => {
  const { user, setUser } = useContext(LoginContext);

  useEffect(() => {
    const checkUserStatus = async () => {
      var response = await checkCurrentUser()
      var response2 = await fetchUser(response.data.id)
      console.log(response)
      console.log(response2.data.user)
      setUser(response2.data.user)
    }
    checkUserStatus()
  },[])

  return (
    <div className="bg-[#a2b8cd]">
      <Header />
      <Banner />
      <CategorySection />
    </div>
  );
}

export default Home