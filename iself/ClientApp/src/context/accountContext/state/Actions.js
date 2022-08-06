import { types } from "./Reducers";
import "firebase/compat/auth";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const useActions = (state, dispatch) => {
  const logout = () => {
    const auth = getAuth();
    signOut(auth);
    dispatch({
      type: types.SET_LOGOUT,
      payload: { user_name: state.account.userDetails.user_name },
    });
  };
  const setLogin = (isLogin) => {
    dispatch({ type: types.SET_LOGIN, payload: isLogin });
  };

  const login = async ({ username, password }, callback) => {
    dispatch({ type: types.SET_LOADING });
    const auth = getAuth();
    // await auth.setPersistence({ type: "LOCAL" });
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        console.log(userCredential);
        dispatch({ type: types.SET_LOGIN, payload: true });
        if (typeof callback === "function") callback(true);
      })
      .catch((error) => {
        console.log(error);
        callback(false);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const loadMenu = (user_role_id, callback) => {};

  return {
    login,
    logout,
    loadMenu,
    setLogin,
  };
};
