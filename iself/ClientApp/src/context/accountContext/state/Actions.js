import { types } from "./Reducers";
import "firebase/compat/auth";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { message } from "antd";
import { httpGet, httpPost, httpPut } from "../../../utils/HttpClient";

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
    if (!isLogin) logout();
    else dispatch({ type: types.SET_LOGIN, payload: isLogin });
  };

  const login = async ({ username, password }, callback) => {
    dispatch({ type: types.SET_LOADING });
    const auth = getAuth();
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        dispatch({ type: types.SET_LOGIN, payload: true });
        if (typeof callback === "function") callback(true);
        message.success("Login success");
      })
      .catch((error) => {
        console.log(error);
        callback(false);
      });
  };

  const validate = async () => {
    httpPost("auth/validate", {})
      .then((a) => {})
      .catch((e) => {});
  };

  const submitFeedback = async (param) => {
    await httpPost("feedbacks", param)
      .then((a) => {})
      .catch((e) => {});
  };

  const getAccountDetails = async () => {
    var response = await httpGet("users/me");
    if (response.succeeded)
      dispatch({
        type: types.SET_USER_DETAILS,
        payload: response.data,
      });
  };

  const updateProfileDetails = async (param, callback) => {
    var response = await httpPut("users", param);
    if (response.succeeded) {
      dispatch({
        type: types.SET_USER_DETAILS,
        payload: response.data,
      });
      if (typeof callback === "function") callback();
    }
  };

  const newUser = async (param, callback) => {
    var response = await httpPost("users", param);
    console.log(response);
    if (response.succeeded) {
      if (typeof callback === "function") callback();
      message.success("User created!");
    }
  };

  return {
    login,
    logout,
    getAccountDetails,
    setLogin,
    validate,
    submitFeedback,
    updateProfileDetails,
    newUser,
  };
};
