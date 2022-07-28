import React, { useReducer } from "react";
import { reducer, initialState } from "./Reducers";

import { useActions } from "./Actions";
import { useCombinedReducer } from "../../../utils/CombineReducer";

const PostContext = React.createContext();

const PostProvider = ({ children }) => {
  const [state, dispatch] = useCombinedReducer({
    post: useReducer(reducer, initialState),
  });

  //Get action from useActions and pass it to context
  const actions = {
    post: useActions(state, dispatch),
  };

  return (
    <PostContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
