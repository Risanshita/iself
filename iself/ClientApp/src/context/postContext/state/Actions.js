import { message } from "antd";
import { httpGet, httpDelete, httpPost } from "../../../utils/HttpClient";
import { types } from "./Reducers";

export const useActions = (state, dispatch) => {
  async function loadHomeData(
    createdBy = "",
    q = "",
    type = "",
    take = 100,
    skip = 0
  ) {
    var response = await httpGet(
      `posts?createdBy=${createdBy}&type=${type}&query=${q}&take=${take}&skip=${skip}`
    );

    if (response.succeeded)
      dispatch({
        type: types.SET_POST_DATA,
        payload: response.data,
      });
  }

  async function loadData(
    { createdBy = "", q = "", type = "" } = { createdBy: "", q: "", type: "" },
    isLoadMore = false
  ) {
    const { skip, take } = isLoadMore
      ? state.post.postDetails
      : { skip: 0, take: 20 };

    var response = await httpGet(
      `posts?createdBy=${createdBy}&type=${type}&query=${q}&take=${take}&skip=${skip}`
    );

    if (response.succeeded)
      dispatch({
        type: types.SET_POST_DATA,
        payload: response.data,
      });
  }

  const nextPost = () => {
    changePost();
  };

  const previousPost = () => {
    changePost(true);
  };

  const changePost = (isPrevious = false) => {
    const { currentPost, postDetails } = state.post;
    var posts = postDetails ? postDetails.data : [];
    if (Array.isArray(posts) && posts.length > 0) {
      var currentIndex = currentPost
        ? posts.findIndex((a) => a.id === currentPost.id) +
          (!isPrevious ? 1 : -1)
        : 0;

      if (!isPrevious && !(currentIndex < posts.length)) {
        currentIndex = 0;
      }

      if (isPrevious && currentIndex < 0) {
        currentIndex = posts.length - 1;
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

    var response = await httpPost(`posts`, post);

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

    var response = await httpDelete(`posts/${post.id}`);
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
    loadHomeData,
    loadData,
    nextPost,
    deletePost,
    createPost,
    previousPost,
  };
};
