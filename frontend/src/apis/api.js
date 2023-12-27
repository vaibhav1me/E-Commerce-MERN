import axios from "axios";

const URL = `http://localhost:3000/api`;

export const registerUser = async (data) => {
  try {
    return await axios.post(`${URL}/users/registerUser`, data);
    // console.log(data);
  } catch (error) {
    console.log("Error while calling signup API", error);
  }
};

export const updateUser = async (userId, values) => {
  try {
    return await axios.patch(`${URL}/users/${userId}`, values)
  } catch (error) {
    console.log(error)
  }
}

export const authenticateLogin = async (user) => {
  try {
    return await axios.post(`${URL}/users/loginUser`, user);
  } catch (error) {
    console.log("Error while calling login API: ", error);
  }
};

export const fetchAllCategories = async () => {
  try {
    return await axios.get(`${URL}/category/fetchAll`);
  } catch (error) {
    console.log("Error", error);
  }
};

export const fetchCategory = async (categoryName) => {
  try {
    return await axios.get(`${URL}/category/${categoryName}`);
  } catch (error) {
    console.log("Error", error);
  }
};

export const fetchProduct = async (productId) => {
  try {
    return await axios.get(`${URL}/products/${productId}`);
  } catch (error) {
    console.log(error);
  }
};

export const checkCurrentUser = async () => {
  try {
    const token = localStorage.getItem("jwt");
    // console.log(token)
    return await axios.post(`${URL}`, { token });
    // return await axios.post(`${URL}`);
  } catch (error) {
    console.log(error);
  }
};

export const fetchUser = async (userId) => {
  try {
    return await axios.get(`${URL}/users/${userId}`);
  } catch (error) {
    console.log(error);
  }
};

export const addToCart = async (productId, token, userId) => {
  try {
    return await axios.patch(`${URL}/carts/addToCart`, {
      productId,
      userId,
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeFromCart = async (productId, token, userId, removeAll) => {
    try {
        return await axios.patch(`${URL}/carts/removeItem`, {productId, token, userId, removeAll})
    } catch (error) {
        console.log(error)
    }
}

export const fetchCart = async (userId, token) => {
    try {
        return await axios.post(`${URL}/carts/fetchCart`, {userId, token})
    } catch (error) {
        console.log(error)
    }
}

export const createOrder = async (userId, token, orderItems) => {
  try {
    return await axios.post(`${URL}/orders`, {userId, token, orderItems})
  } catch (error) {
    console.log(error)
  }
}

export const emptyCart = async (userId, token) => {
  try {
    return await axios.patch(`${URL}/carts/emptyCart`, {userId, token})
  } catch (error) {
    console.log(error)
  }
} 

export const fetchOrders = async (userId, token) => {
  try {
    return await axios.post(`${URL}/orders/${userId}`, {token})
  } catch (error) {
    console.log(error)
  }
}

export const fetchOrdersBySeller = async (sellerName, token) => {
  try {
    return await axios.post(`${URL}/orders/seller`, {sellerName, token})
  } catch (error) {
    console.log(error)
  }
}