const initialState = {
  theme: "light",
  userDetails: {},
  loading: false,
  menuDetails: [],
  login: true,
};

const types = {
  SET_USER_TYPE: "SET_USER_TYPE",
  SET_LOGIN: "SET_LOGIN",
  SET_LOGOUT: "SET_LOGOUT",
  SET_LOADING: "SET_LOADING",
  SET_MENU: "SET_MENU",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.SET_LOGIN:
      return {
        ...state,
        userDetails: action.payload,
        loading: false,
        login: true,
      };
    case types.SET_LOGOUT:
      return {
        ...state,
        login: false,
        userDetails: action.payload,
      };
    case types.SET_MENU:
      return {
        ...state,
        menuDetails: action.payload,
      };
    default:
      return state;
  }
};

export { initialState, types, reducer };
