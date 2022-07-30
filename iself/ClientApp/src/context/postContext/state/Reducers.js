const initialState = {
  theme: "light",
  posts: [],
  loading: false,
  currentPost: {},
};

const types = {
  SET_HOME_DATA: "SET_HOME_DATA",
  SET_CURRENT_POST: "SET_CURRENT_POST",
  STOP_LOADING: "STOP_LOADING",
  START_LOADING: "START_LOADING",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    case types.SET_HOME_DATA:
      return {
        ...state,
        posts: action.payload,
        currentPost: action.payload.length > 0 ? action.payload[0] : {},
        loading: false,
      };
    case types.SET_CURRENT_POST:
      return {
        ...state,
        currentPost: action.payload,
      };
    default:
      return state;
  }
};

export { initialState, types, reducer };