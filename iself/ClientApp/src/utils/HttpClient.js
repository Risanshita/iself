import { getAuth, signOut } from "firebase/auth";

const getToken = () => "Bearer " + localStorage.getItem("access_token");
const getHeader = () => {
  var token = getToken();
  return {
    "Content-Type": "application/json",
    Authorization: token,
  };
};

export async function httpDelete(url) {
  var res = await fetch(url, {
    headers: getHeader(),
    method: "DELETE",
  });
  return await response(res);
}

export async function httpPost(url, data, option) {
  var res = await fetch(url, {
    headers: getHeader(),
    method: "POST",
    body: JSON.stringify(data),
  });
  return await response(res, option);
}

export async function httpPut(url, data) {
  var res = await fetch(url, {
    headers: getHeader(),
    method: "PUT",
    body: JSON.stringify(data),
  });
  return await response(res);
}

export async function httpPatch(url, data) {
  var res = await fetch(url, {
    headers: getHeader(),
    method: "PATCH",
    body: JSON.stringify(data),
  });
  return await response(res);
}

export async function httpGet(url) {
  var res = await fetch(url, {
    headers: getHeader(),
    method: "GET",
  });
  return await response(res);
}

async function response(res, option) {
  if (
    typeof res.status === "number" &&
    res.status >= 200 &&
    res.status <= 299
  ) {
    try {
      return await res.json();
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  if (res.status === 401 && (!option || !option.logout)) {
    const auth = getAuth();
    signOut(auth);
  }
  try {
    return await res.json();
  } catch (e) {
    console.log(e);
    return {
      succeeded: false,
      status: res.status,
    };
  }
}
