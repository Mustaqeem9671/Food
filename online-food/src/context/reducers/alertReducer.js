const alertReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_SUCCESS":
    case "SET_WARNING":
    case "SET_DANGER":
    case "SET_INFO":
      return action.alert;

    case "SET_ALERT_NULL":
      return null;

    default:
      return state;
  }
};

export default alertReducer;
