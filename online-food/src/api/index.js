import axios from "axios";
// import { baseUrl } from "./index";


export const baseUrl =
  "http://localhost:5001/online-food-5a03e/us-central1/app";

export const validateUserJWTToken = async (token) => {
  try {
    const res = await axios.get(`${baseUrl}/api/users/jwtVerification`, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data.data;
  } catch (err) {
    return null;
  }
};

//add new product
export const addNewProduct = async (data) => {
  try {
    const res = await axios.post(`${baseUrl}/api/products/create`, { ...data });
    return res.data.data;
  } catch (err) {
    return null;
  }
};

//get all the products
export const getAllProducts = async () => {
  try {
    const res = await axios.get(`${baseUrl}/api/products/all`,);
    return res.data.data;
  } catch (err) {
    return null;
  }
};

//delete a product

export const deleteAProduct = async (productId) => {
  try {
    const res = await axios.delete(`${baseUrl}/api/products/delete/${productId}`);
    return res.data.data;
  } catch (err) {
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseUrl}/api/users/all`);
    return res.data.data;
  } catch (err) {
    return null;
  }
};

//delete a user from the database
// export const deleteAUser = async (userId) => {
//   try {
//     const res = await axios.delete(`${baseUrl}/api/products/delete/${userId}`);
//     return res.data.data;
//   } catch (err) {
//     return null;
//   }
// };
//add an items to the cart
//add new items to the cart
export const addNewItemToCart = async (user_id, data) => {
  try {
    const res = await axios.post(
      `${baseUrl}/api/products/addToCart/${user_id}`, 
      {...data }
    );
    return res.data.data;
  } catch (err) {
    return null;
  }
};

export const getAllCartItems = async (user_id) => {
  try {
    const res = await axios.get(
      `${baseUrl}/api/products/getCartItems/${user_id}`
    );
    // console.log(res.data);
    return res.data.data;
  } catch (err) {
    return null;
  }
};

// cart increment
export const increaseItemQuantity = async (user_id, productId, type) => {
  console.log(user_id, productId, type);
  try {
    const res = await axios.post(
      `${baseUrl}/api/products/updateCart/${user_id}`,
      null,
      { params: { productId:productId, type: type } }
    );
    return res.data.data;
  } catch (err) {
    return null;
  }
};


export const getAllOrder = async () => {
  try {
    const res = await axios.get(
      `${baseUrl}/api/products/orders`
    );
    // console.log(res.data);
    return res.data.data;
  } catch (err) {
    return null;
  }
};

//update the order status
export const updateOrderSts = async (order_id, sts) => {
  try {
    const res = await axios.get(`${baseUrl}/api/products/updateOrder/${order_id}`,
    null, { params: { sts: sts} }
    );
    return res.data.data;

  } catch (err) {
    return null
  }
};