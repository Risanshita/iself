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

  return {
    loadData,
  };
};
