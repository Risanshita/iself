const initialState = {
  theme: "light",
  posts: [],
  loading: false,
};

const types = {
  SET_HOME_DATA: "SET_HOME_DATA",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.SET_HOME_DATA:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export { initialState, types, reducer };
