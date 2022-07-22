import postNotification from "../../components/Message";
import { types } from "./Reducers";

export const useActions = (state, dispatch) => {
  const logout = () => {
    dispatch({
      type: types.SET_LOGOUT,
      payload: { user_name: state.account.userDetails.user_name },
    });
  };

  const login = ({ username, password }, callback) => {
    // dispatch({ type: types.SET_LOADING });
    // post(
    //   userBaseUrl() + "/validate/login",
    //   {
    //     email_id: username,
    //     password: password,
    //   },
    //   callback
    // ).then((result) => {
    //   if (result.data.status) {
    //     var data = result.data.data[0];

    //     window.localStorage.setItem("logged-user-name", data.user_name); 
    //     window.localStorage.setItem("user-details", JSON.stringify(data));
    //     dispatch({ type: types.SET_LOGIN, payload: data });
    //     postNotification({
    //       type: "success",
    //       title: "Login success",
    //     });
    //     loadMenu(data.user_role_id, callback);
    //   } else {
    //     postNotification({
    //       type: "error",
    //       message: result.data.message,
    //       title: "Login failed",
    //     });
    //   }
    // });
  };

  const loadMenu = (user_role_id, callback) => {
    // get(userBaseUrl() + "/menu-master/list?user_fk=" + user_role_id).then(
    //   (result) => {
    //     console.log(result);
    //     var list = result.data.data;

    //     window.localStorage.setItem("user-menu", JSON.stringify(list));
    //     dispatch({ type: types.SET_MENU, payload: list });

    //     if (typeof callback === "function") callback();
    //   }
    // );
  };

  return {
    login,
    logout,
    loadMenu,
  };
};
