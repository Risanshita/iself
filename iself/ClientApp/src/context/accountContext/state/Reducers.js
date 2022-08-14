const initialState = {
  theme: "light",
  userDetails: {},
  loading: false,
  menuDetails: [],
  userClaims: [],
  login: false,
};

const types = {
  SET_USER_TYPE: "SET_USER_TYPE",
  SET_LOGIN: "SET_LOGIN",
  SET_LOGOUT: "SET_LOGOUT",
  SET_LOADING: "SET_LOADING",
  SET_MENU: "SET_MENU",
  SET_USER_DETAILS: "SET_USER_DETAILS",
  SET_USER_CLAIMS: "SET_USER_CLAIMS",
};

export const UserRoles = {
  SuperAdmin: "SuperAdmin",
  Admin: "Admin",
  User: "User",
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
        loading: false,
        login: action.payload,
      };
    case types.SET_LOGOUT:
      return {
        ...state,
        login: false,
      };
    case types.SET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };
    case types.SET_MENU:
      return {
        ...state,
        menuDetails: action.payload,
      };
    case types.SET_USER_CLAIMS:
      return {
        ...state,
        userClaims: action.payload,
      };
    default:
      return state;
  }
};

export { initialState, types, reducer };
