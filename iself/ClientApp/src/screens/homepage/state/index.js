import React, { useReducer } from "react";
import { reducer, initialState } from "./Reducers";

import { useActions } from "./Actions";
import { useCombinedReducer } from "../../../utils/CombineReducer";

const HomeContext = React.createContext();

const HomeProvider = ({ children }) => {
  const [state, dispatch] = useCombinedReducer({
    home: useReducer(reducer, initialState),
  });

  //Get action from useActions and pass it to context
  const actions = {
    home: useActions(state, dispatch),
  };

  return (
    <HomeContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </HomeContext.Provider>
  );
};

export { HomeContext, HomeProvider };
