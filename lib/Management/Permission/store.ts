import { create } from "zustand";
import { apiFetch, Endpoint } from "../../api";
import iOptions from "../../../Interfaces/iOptions";
import { PerPageEnum } from "../User/store";
import iPermission from "../../../Interfaces/iPermission";
import { api } from "../../axios";
import iUserGroup from "../../../Interfaces/iUserGroup";
import toast from "react-hot-toast";
import { handleBackendError } from "../../errorHelper";
import { iUserEditForm } from "../../../pages/management/users/edit/[id]";
import { UseFormSetError } from "react-hook-form";
import { iUserGroupForm } from "../../../components/Elements/UserGroup/EditUserGroup/EditUserGroupModal";

interface iPermissionStore {
  loading: boolean;
  userGroups: [];
  getUserGroups: () => void;
  getPermissions: (withOutPermissionIds?: number[]) => Promise<iPermission[]>;
  getUserGroup: (userGroupId: number) => Promise<iUserGroup>;
  updateUserGroup: (
    data: iUserGroupForm,
    setError: UseFormSetError<iUserGroupForm>
  ) => Promise<iUserGroup>;
  options: iOptions;
  setOptions: (
    key: string,
    value: number | string | boolean | PerPageEnum
  ) => void;
}

const useStore = create<iPermissionStore>((set, get) => ({
  loading: false,
  userGroups: [],
  options: {
    perPage: PerPageEnum.ten,
    page: 1,
    sortBy: "levelId",
    total: 0,
  },
  filters: {
    search: "",
    branchId: null,
    withOnlyTrashed: false,
  },

  getUserGroups: () => {
    set({
      loading: true,
    });
    const options = get().options;
    apiFetch(
      `/user-groups?sortBy=${options.sortBy}&perPage=${options.perPage}&page=${options.page}`,
      Endpoint.backend
    )
      .then((response) => {
        set({
          userGroups: response.data,
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
          userGroups: [],
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

  getPermissions: (withOutPermissionIds) => {
    set({
      loading: true,
    });
    return api(`/api/permissions`, { params: { withOutPermissionIds } })
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

  getUserGroup: (id) => {
    set({
      loading: true,
    });
    return api(`/api/user-groups/${id}`, { params: { userGroupId: id } })
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
  updateUserGroup: (data, setError) => {
    set({
      loading: true,
    });
    return api
      .put(`/api/user-groups/${data.userGroupId}`, data)
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
