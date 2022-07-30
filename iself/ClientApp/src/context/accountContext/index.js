import React, { useReducer } from "react";
import {
  reducer as accountReducer,
  initialState as accountInitialState,
} from "./state/Reducers";

import { useActions as accountActions } from "./state/Actions";
import { useCombinedReducer } from "../../utils/CombineReducer";

const AccountContext = React.createContext();

const AccountProvider = ({ children }) => {
  var userDetails = window.localStorage.getItem("user-details");
  var userMenuDetails = window.localStorage.getItem("user-menu");

  if (!userDetails || userDetails === "undefined" || userDetails === "null")
    userDetails = {};
  else userDetails = JSON.parse(userDetails);

  if (
    !userMenuDetails ||
    userMenuDetails === "undefined" ||
    userMenuDetails === "null"
  )
    userMenuDetails = [];
  else userMenuDetails = JSON.parse(userMenuDetails);

  const [state, dispatch] = useCombinedReducer({
    account: useReducer(accountReducer, {
      ...accountInitialState,
      userDetails: {
        ...accountInitialState.userDetails,
        ...userDetails,
        fullName: window.localStorage.getItem("logged-user-name"),
      },
      menuDetails: userMenuDetails,
    }),
  });

  //Get action from useActions and pass it to context
  const actions = {
    account: accountActions(state, dispatch),
  };

  return (
    <AccountContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </AccountContext.Provider>
  );
};

export { AccountContext, AccountProvider };
