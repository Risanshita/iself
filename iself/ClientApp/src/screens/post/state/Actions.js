import { message } from "antd";
import { types } from "./Reducers";

export const useActions = (state, dispatch) => {
  async function createPost(post, callback) {
    dispatch({
      type: types.START_LOADING,
    });

    var res = await fetch(`posts`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
      method: "POST",
      keepalive: true,
    });

    const response = await res.json();
    console.log(response);
    if (response.succeeded) {
      dispatch({
        type: types.START_LOADING,
      });
      if (typeof callback === "function") {
        callback();
      }
      message.success(response.message);
    } else message.error(response.message);
  }

  return {
    createPost,
  };
};
