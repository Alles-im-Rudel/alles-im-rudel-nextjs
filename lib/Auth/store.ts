import { create } from "zustand";
import { apiFetch, Endpoint } from "../api";
import { iLoginForm } from "../../pages/login";
import { storageLocal } from "../StorageHandler";
import iPermission from "../../Interfaces/iPermission";
import iUser from "../../Interfaces/iUser";

interface iAuthStore {
  user: {} | iUser;
  accessToken: string;
  refreshToken: string;
  tokenExpiresIn: string;
  isAuth: boolean;
  permissions: iPermission[];
  isLoading: boolean;
  login: (form: iLoginForm) => Promise<boolean>;
  getAuth: () => boolean;
  logout: () => void;
  can: (permission: string) => boolean;
}

const useStore = create<iAuthStore>((set, get) => ({
  user: storageLocal.getJson("user", {}),
  accessToken: storageLocal.get("accessToken", ""),
  refreshToken: storageLocal.get("refreshToken", ""),
  tokenExpiresIn: storageLocal.get("tokenExpiresIn", ""),
  isAuth: storageLocal.getBoolean("isAuth"),
  permissions: storageLocal.getJson("permissions", []),
  isLoading: false,

  login: async (form) => {
    set({
      isLoading: true,
    });
    return await apiFetch("/login", Endpoint.backend, {
      // @ts-ignore
      method: "POST",
      body: JSON.stringify(form),
    })
      .then((response) => {
        storageLocal.set("accessToken", response.tokens.access_token);
        storageLocal.set("refreshToken", response.tokens.refresh_token);
        storageLocal.set("tokenExpiresIn", response.tokens.expires_in);
        storageLocal.setJson("user", response.user);
        storageLocal.setJson("permissions", response.permissions);
        storageLocal.set("isAuth", true);
        set({
          user: response.user,
          accessToken: response.tokens.access_token,
          refreshToken: response.tokens.refresh_token,
          tokenExpiresIn: response.tokens.expires_in,
          isAuth: true,
          permissions: response.permissions,
          isLoading: false,
        });
        return true;
      })
      .catch(() => {
        storageLocal.remove("accessToken");
        storageLocal.remove("refreshToken");
        storageLocal.remove("tokenExpiresIn");
        storageLocal.remove("isAuth");
        set({
          user: {},
          accessToken: "",
          refreshToken: "",
          tokenExpiresIn: "",
          isAuth: false,
          permissions: [],
          isLoading: false,
        });
        return false;
      });
  },

  getAuth: () => {
    if (get().isAuth) {
      apiFetch("/auth", Endpoint.backend)
        .then((response) => {
          set({
            user: response.user,
            permissions: response.permissions,
          });
          console.log(response.permissions);
        })
        .catch(() => {
          storageLocal.remove("accessToken");
          storageLocal.remove("refreshToken");
          storageLocal.remove("tokenExpiresIn");
          storageLocal.remove("isAuth");
          set({
            user: {},
            accessToken: "",
            refreshToken: "",
            tokenExpiresIn: "",
            isAuth: false,
            permissions: [],
          });
        });
    } else {
      storageLocal.remove("accessToken");
      storageLocal.remove("refreshToken");
      storageLocal.remove("tokenExpiresIn");
      storageLocal.remove("isAuth");
      storageLocal.remove("permissions");
      storageLocal.remove("user");
      set({
        user: {},
        accessToken: "",
        refreshToken: "",
        tokenExpiresIn: "",
        isAuth: false,
        permissions: [],
      });
    }
    return get().isAuth;
  },

  logout: () => {
    storageLocal.remove("accessToken");
    storageLocal.remove("refreshToken");
    storageLocal.remove("tokenExpiresIn");
    storageLocal.remove("isAuth");
    set({
      user: {},
      accessToken: "",
      refreshToken: "",
      tokenExpiresIn: "",
      isAuth: false,
      permissions: [],
    });
  },

  can: (permission) => {
    return get().permissions.some((p) => p.name === permission);
  },
}));

export default useStore;
