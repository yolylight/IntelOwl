import axios from "axios";
import { create } from "zustand";

import { addToast } from "@certego/certego-ui";

import Cookies from "js-cookie";
import { USERACCESS_URI, AUTH_BASE_URI } from "../constants/apiURLs";

// constants
const CSRF_TOKEN = "csrftoken";

// hook/ store see: https://github.com/pmndrs/zustand
export const useAuthStore = create((set, get) => ({
  loading: false,
  CSRFToken: Cookies.get(CSRF_TOKEN) || "",
  user: {
    username: "",
    full_name: "",
    first_name: "",
    last_name: "",
    email: "",
    is_staff: false,
  },
  access: null,
  isAuthenticated: () => !!get().CSRFToken,
  updateToken: () => set({ CSRFToken: Cookies.get(CSRF_TOKEN) }),
  deleteToken: () => set({ CSRFToken: "" }),
  service: {
    fetchUserAccess: async () => {
      try {
        const resp = await axios.get(USERACCESS_URI, {
          certegoUIenableProgressBar: false,
        });
        set({
          user: resp.data.user,
          access: resp.data.access,
        });
      } catch (err) {
        addToast(
          "获取用户访问信息时出错!",
          err.parsedMsg,
          "danger",
        );
      }
    },
    loginUser: async (body) => {
      try {
        set({ loading: true });
        const resp = await axios.post(`${AUTH_BASE_URI}/login`, body, {
          certegoUIenableProgressBar: false,
        });
        get().updateToken();
        addToast("你已登录!", null, "success");
        return Promise.resolve(resp);
      } catch (err) {
        addToast("登录失败!", err.parsedMsg, "danger", true);
        return Promise.reject(err);
      } finally {
        set({ loading: false });
      }
    },
    logoutUser: async () => {
      set({ loading: true });
      const onLogoutCb = () => {
        get().deleteToken();
        // rmeove from the browser or it will persist next time we open a tab
        Cookies.remove(CSRF_TOKEN);
        set({ loading: false });
        addToast("已登出!", null, "info");
      };
      return axios
        .post(`${AUTH_BASE_URI}/logout`, null, {
          certegoUIenableProgressBar: false,
        })
        .then(onLogoutCb)
        .catch(onLogoutCb);
    },
    forceLogout: () => {
      addToast(
        "令牌无效。您将很快登出",
        null,
        "spinner",
        true,
        1000,
      );
      return setTimeout(get().service.logoutUser, 500);
    },
    changePassword: async (values) => {
      try {
        set({ loading: true });
        const resp = await axios.post(
          `${AUTH_BASE_URI}/changepassword`,
          values,
          {
            certegoUIenableProgressBar: false,
          },
        );
        return Promise.resolve(resp);
      } catch (err) {
        return Promise.reject(err);
      } finally {
        set({ loading: false });
      }
    },
  },
}));
