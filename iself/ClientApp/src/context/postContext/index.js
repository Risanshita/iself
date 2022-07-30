import React, { useReducer } from "react";
import {
  reducer as postReducer,
  initialState as postInitialState,
} from "./state/Reducers";

import { useActions as postActions } from "./state/Actions";
import { useCombinedReducer } from "../../utils/CombineReducer";

const PostContext = React.createContext();

const PostProvider = ({ children }) => {
  const [state, dispatch] = useCombinedReducer({
    post: useReducer(postReducer, postInitialState),
  });

  //Get action from useActions and pass it to context
  const actions = {
    post: postActions(state, dispatch),
  };

  return (
    <PostContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
