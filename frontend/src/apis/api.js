import axios from 'axios'

const URL = `http://localhost:3000/api`

export const registerUser = async (data) => {
    try {
        return await axios.post(`${URL}/users/registerUser`, data)
        // console.log(data);
    } catch (error) {
        console.log('Error while calling signup API', error)
    }
}

export const authenticateLogin = async (user) => {
    try {
        return await axios.post(`${URL}/users/loginUser`, user)
    } catch (error) {
        console.log('Error while calling login API: ', error);
    }
}
