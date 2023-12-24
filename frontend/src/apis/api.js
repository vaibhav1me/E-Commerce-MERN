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

export const fetchAllCategories = async () => {
    try {
        return await axios.get(`${URL}/category/fetchAll`)
    } catch (error) {   
        console.log('Error', error)
    }
}

export const fetchCategory = async (categoryName) => {
    try {
        return await axios.get(`${URL}/category/${categoryName}`)
    } catch (error) {
        console.log('Error', error)
    }
}

export const fetchProduct = async (productId) => {
    try {
        return await axios.get(`${URL}/products/${productId}`)
    } catch (error) {
        console.log(error)
    }
}

export const addToCart = async (productId, token, userId) => {
    try {
        return await axios.patch(`${URL}/carts/addToCart`, {productId, userId, token})
    } catch (error) {
        console.log(error)
    }
}

export const checkCurrentUser = async () => {
    try {
        const token = localStorage.getItem("jwt");
        // console.log(token)
        return await axios.post(`${URL}`, {token})
    } catch (error) {
        console.log(error)
    }
}

export const fetchUser = async (userId) => {
    try {
        return await axios.get(`${URL}/users/${userId}`)
    } catch (error) {
        console.log(error)
    }
}