import { message } from "antd";
import { types } from "./Reducers";

export const useActions = (state, dispatch) => {
  async function loadData(
    createdBy = "",
    q = "",
    type = "",
    take = 50,
    skip = 0
  ) {
    var res = await fetch(
      `posts?createdBy=${createdBy}&type=${type}&query=${q}&take=${take}&skip=${skip}`
    );

    const response = await res.json();
    if (response.succeeded)
      dispatch({
        type: types.SET_HOME_DATA,
        payload: response.data,
      });
  }

  const start = () => {
    const { posts, currentPost } = state.home;
    if (Array.isArray(posts)) {
      var currentIndex = currentPost
        ? posts.findIndex((a) => a.id == currentPost.id) + 1
        : 0;
      if (currentIndex < posts.length - 1) {
        currentIndex = 0;
      }
      dispatch({
        type: types.SET_CURRENT_POST,
        payload: posts[currentIndex],
      });
    }
  };
  async function createPost(post, callback) {
    dispatch({
      type: types.START_LOADING,
    });

    var res = await fetch(`posts`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
      method: "POST",
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

  async function deletePost(post, callback) {
    dispatch({
      type: types.START_LOADING,
    });

    var res = await fetch(`posts/${post.id}`, {
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
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
    loadData,
    start,
    deletePost,
    createPost,
  };
};
