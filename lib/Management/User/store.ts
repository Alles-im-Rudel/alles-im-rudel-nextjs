import { create } from "zustand";
import { apiFetch, Endpoint } from "../../api";
import iOptions from "../../../Interfaces/iOptions";
import iUser from "../../../Interfaces/iUser";
import { api } from "../../axios";
import { iUserEditForm } from "../../../pages/management/users/edit/[id]";
import toast from "react-hot-toast";
import { UseFormSetError } from "react-hook-form";
import { handleBackendError } from "../../errorHelper";

export enum PerPageEnum {
  ten = 10,
  thirty = 30,
  fifty = 50,
}

export interface iFilters {
  search: string;
  branchId: null | number;
  withOnlyTrashed: boolean;
}

interface iUserStore {
  loading: boolean;
  users: [];
  getUsers: () => void;
  getUser: (id: number) => Promise<iUser>;
  updateUser: (
    data: iUserEditForm,
    setError: UseFormSetError<iUserEditForm>
  ) => Promise<{ user: iUser; message: string }>;
  getAllUsers: (withOutUserIds?: number[]) => Promise<iUser[]>;
  options: iOptions;
  filters: iFilters;
  setOptions: (
    key: string,
    value: number | string | boolean | PerPageEnum
  ) => void;
  setFilters: (key: string, value: number | string | boolean | null) => void;
}

const useStore = create<iUserStore>((set, get) => ({
  loading: false,
  users: [],
  options: {
    perPage: PerPageEnum.ten,
    page: 1,
    sortBy: "firstName",
    total: 0,
  },
  filters: {
    search: "",
    branchId: null,
    withOnlyTrashed: false,
  },

  getUsers: () => {
    set({
      loading: true,
    });
    const options = get().options;
    const filters = get().filters;

    apiFetch(
      `/users/?sortBy=${options.sortBy}&perPage=${options.perPage}&page=${
        options.page
      }&withOnlyTrashed=${filters.withOnlyTrashed}${
        filters.search ? `&search=${filters.search}` : ""
      }${filters.branchId ? `&branchId=${filters.branchId}` : ""}`,
      Endpoint.backend
    )
      .then((response) => {
        set({
          users: response.data,
          options: {
            ...options,
            perPage: parseInt(response.meta.per_page),
            total: response.meta.total,
          },
          loading: false,
        });
      })
      .catch(() => {
        set({
          users: [],
          loading: false,
        });
      });
  },

  setOptions: (key, value) => {
    const options = get().options;
    if (key === "perPage") {
      set({
        options: {
          ...options,
          perPage: value,
          page: 1,
        },
      });
    } else {
      set({
        options: {
          ...options,
          [key]: value,
        },
      });
    }
  },
  setFilters: (key, value) => {
    const options = get().options;
    const filters = get().filters;
    set({
      filters: {
        ...filters,
        [key]: value,
      },
    });
    set({
      options: {
        ...options,
        page: 1,
      },
    });
  },

  getUser: (id) => {
    set({
      loading: true,
    });
    return apiFetch(`/users/${id}`, Endpoint.backend)
      .then((response) => {
        set({
          loading: false,
        });
        return response.data;
      })
      .catch(() => {
        set({
          loading: false,
        });
        return null;
      });
  },

  getAllUsers: (withOutUserIds) => {
    set({
      loading: true,
    });
    return api(`/api/users/all`, { params: { withOutUserIds } })
      .then((response) => {
        set({
          loading: false,
        });
        return response.data.data;
      })
      .catch(() => {
        set({
          loading: false,
        });
        return null;
      });
  },

  updateUser: (data, setError) => {
    set({
      loading: true,
    });
    return api
      .put(`/api/users/${data.userId}`, data)
      .then((response) => {
        set({
          loading: false,
        });
        toast.success(response.data?.message, { position: "bottom-right" });
        return response.data;
      })
      .catch((error) => {
        set({
          loading: false,
        });
        handleBackendError(error, setError);
        toast.error(error.response.data.message, { position: "bottom-right" });
        return null;
      });
  },
}));

export default useStore;
