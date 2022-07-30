import { types } from "./Reducers";

export const useActions = (state, dispatch) => {
  async function loadData(
    createdBy = "",
    q = "",
    type = "",
    take = 100,
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

  const start = (posts) => {
    const { currentPost } = state.home;
    if (Array.isArray(posts)) {
      var currentIndex = currentPost
        ? posts.findIndex((a) => a.id === currentPost.id) + 1
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

  return {
    loadData,
    start,
  };
};
