const initialState = {
  theme: "light",
  postDetails: { data: [] },
  loading: false,
  currentPost: undefined,
  postIndex: undefined,
};

const types = {
  SET_POST_DATA: "SET_POST_DATA",
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
    case types.SET_POST_DATA:
      return {
        ...state,
        postDetails: action.payload,
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
