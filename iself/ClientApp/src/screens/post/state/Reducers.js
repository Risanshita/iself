const initialState = {
  theme: "light",
  posts: [],
  loading: false,
  currentPost: {},
};

const types = {
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
        loading: true,
      };
    default:
      return state;
  }
};

export { initialState, types, reducer };
