export const setCartOn = () => {
    return (dispatch) => {
     dispatch({type: "SET_CART_ON"});
    };
};

export const setCartOff = () => {
    return (dispatch) => {
   dispatch({type: "SET_CART_OFF"});
    };
};

export const getCartDisplayState = () => {
    return {
        type: "GET_CART_DISPLAY_STATE",
    };
};