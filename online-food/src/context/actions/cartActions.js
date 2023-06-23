

export const setCartItems = (items) => {
    return {
      type: "SET_CART_ITEMS",
      payload: items,
    };
  };
  
  export const getCartItems = () => {
    return {
      type: "GET_CART_ITEMS",
    };
  };
  
  export const clearCartItems = () => {
    return {
      type: "CLEAR_CART_ITEMS",
      action: null,
    };
  };
  

