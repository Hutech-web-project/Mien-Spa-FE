import axios from "axios";
import { logout } from "../redux/Auth/auth_page_reducer";

let store;

export const injectStore = (_store) => {
  store = _store;
};

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const accessToken = (previousAPI) => {
  const innerAccessToken = async () => {
    try {
      const refreshToken =
        localStorage.getItem("ck") !== null
          ? localStorage.getItem("refreshToken")
          : sessionStorage.getItem("refreshToken");
      const token =
        localStorage.getItem("ck") !== null
          ? localStorage.getItem("token")
          : sessionStorage.getItem("token");
      const res = await api.post(`/login/refreshtoken`, {
        token,
        refreshToken,
      });
      if (localStorage.setItem("ck") !== null) {
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
      } else {
        sessionStorage.setItem("token", res.data.accessToken);
        sessionStorage.setItem("refreshToken", res.data.refreshToken);
      }

      previousAPI.headers.Authorization = `Bearer ${token}`;
      return api.request(previousAPI);
    } catch (error) {
      throw error;
    }
  };
  return innerAccessToken;
};

api.interceptors.request.use(
  function (config) {
    const checkOut = localStorage.getItem("ck");
    let token;
    if (checkOut != null) {
      token = localStorage.getItem("token");
    } else {
      token = sessionStorage.getItem("token");
    }
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },

  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(null, function (error) {
  if (
    error.config &&
    error.response?.status === 401 &&
    !error.config.__isRetry
  ) {
    return new Promise((resolve, reject) => {
      const callAccess = accessToken(error.config);
      callAccess(error.config)
        .then((result) => {
          resolve(console.log("result", result));
        })
        .catch((err) => {
          reject(console.log("err", err));
          store.dispatch(logout());
          window.location = "/";
        });
    });
  }
  return Promise.reject(error);
});

export default api;
