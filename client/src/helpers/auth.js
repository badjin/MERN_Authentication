import cookie from "js-cookie";

// Set in Cookie
export const setCookie = (key, value) => {
  if (window !== "undefiend") {
    cookie.set(key, value, {
      // 1 Day
      expires: 1,
    });
  }
};
// remove from cookie
export const removeCookie = (key) => {
  if (window !== "undefined") {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

// Get from cookie such as stored token
// Will be useful when we need to make request to server with token
export const getCookie = (key) => {
  if (window !== "undefined") {
    return cookie.get(key);
  }
};

// Set in localstorage
export const setLocalStorage = (key, value) => {
  if (window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
  }
};

// Remove from localstorage
export const removeLocalStorage = key => {
  if (window !== 'undefined') {
      localStorage.removeItem(key);
  }
};

export const authenticate = (response, next) => {
  // console.log("AUTHENTICATE HELPER ON SIGNIN RESPONSE", response);
  setCookie("token", response.token);
  setLocalStorage('user', response.user.id);
  next();
};

export const getLoginInfo = () => {
  if (window === "undefined") return false;
  
  const token = getCookie('token');
  const id = localStorage.getItem('user')
  if (!token || !id) return false;

  return {
    id: JSON.parse(id),
    token
  }
};

export const signout = () => {
  removeCookie("token");
  removeLocalStorage('user');
};
