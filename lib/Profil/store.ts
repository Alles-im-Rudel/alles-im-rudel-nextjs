import { create } from "zustand";
import { apiFetch, Endpoint } from "../api";
import iUser from "../../Interfaces/iUser";
import { api } from "../axios";
import toast from "react-hot-toast";
import { UseFormSetError } from "react-hook-form";
import { handleBackendError } from "../errorHelper";
import { iProfileInputs } from "../../components/Elements/User/Profile/ProfileForm";
import iBranchUserMemberShip from "../../Interfaces/iBranchUserMemberShip";
import { iBackendBranche } from "../../Interfaces/iBranche";

interface iProfileStore {
  loading: boolean;
  branchIsLoading: boolean;
  getUser: () => Promise<iUser>;
  // eslint-disable-next-line no-unused-vars
  updateImage: (data: any) => void;
  updateProfile: (
    // eslint-disable-next-line no-unused-vars
    data: iProfileInputs,
    // eslint-disable-next-line no-unused-vars
    setError: UseFormSetError<iProfileInputs>
  ) => void;
  // eslint-disable-next-line no-unused-vars
  joinBranch: (branch: iBackendBranche, onReload: any) => void;
  leaveBranch: (
    // eslint-disable-next-line no-unused-vars
    branchUserMemberShip: iBranchUserMemberShip,
    // eslint-disable-next-line no-unused-vars
    onReload: any
  ) => void;
  cancelBranch: (
    // eslint-disable-next-line no-unused-vars
    branchUserMemberShip: iBranchUserMemberShip,
    // eslint-disable-next-line no-unused-vars
    onReload: any
  ) => void;
}

const useStore = create<iProfileStore>((set) => ({
  loading: false,
  branchIsLoading: false,

  getUser: () => {
    set({
      loading: true,
    });
    return apiFetch(`/profile`, Endpoint.backend)
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

  updateProfile: (data, setError) => {
    set({
      loading: true,
    });
    return api
      .put(`/api/profile`, data)
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

  updateImage: (data) => {
    set({
      loading: true,
    });

    const request = new FormData();
    request.append("image", data);

    api
      .post(`/api/profile/image`, request, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        set({
          loading: false,
        });
      })
      .catch((error) => {
        toast.error(error.message, { position: "bottom-right" });
        set({
          loading: false,
        });
      });
  },

  joinBranch: (branch, onReload) => {
    set({
      branchIsLoading: true,
    });
    api
      .put(`/api/profile/join-branch/${branch.id}`)
      .then((response) => {
        toast.success(response.data?.message, { position: "bottom-right" });
        set({
          branchIsLoading: false,
        });
        onReload();
      })
      .catch((error) => {
        toast.error(error.message, { position: "bottom-right" });
        set({
          branchIsLoading: false,
        });
        onReload();
      });
  },

  leaveBranch: (branchUserMemberShip, onReload) => {
    set({
      branchIsLoading: true,
    });

    api
      .put(`/api/profile/leave-branch/${branchUserMemberShip.id}`)
      .then((response) => {
        toast.success(response.data?.message, { position: "bottom-right" });
        set({
          branchIsLoading: false,
        });
        onReload();
      })
      .catch((error) => {
        toast.error(error.message, { position: "bottom-right" });
        set({
          branchIsLoading: false,
        });
        onReload();
      });
  },
  cancelBranch: (branchUserMemberShip, onReload) => {
    set({
      branchIsLoading: true,
    });

    api
      .put(`/api/profile/cancel-branch/${branchUserMemberShip.id}`)
      .then((response) => {
        toast.success(response.data?.message, { position: "bottom-right" });
        set({
          branchIsLoading: false,
        });
        onReload();
      })
      .catch((error) => {
        toast.error(error.message, { position: "bottom-right" });
        set({
          branchIsLoading: false,
        });
        onReload();
      });
  },
}));

export default useStore;
