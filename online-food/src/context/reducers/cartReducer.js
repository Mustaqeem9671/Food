const cartReducer = (state = [], action) => {
    switch (action.type) {
      case "GET_CART_ITEMS":
        return state;
  
      case "SET_CART_ITEMS":
        return action.payload || [];
  
      case "CLEAR_CART_ITEMS":
        return [];
  
      default:
        return state;
    }
  };
  
  
  export default cartReducer;