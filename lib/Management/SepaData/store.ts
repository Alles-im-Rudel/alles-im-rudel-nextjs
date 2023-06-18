import { create } from "zustand";
import { api } from "../../axios";
import toast from "react-hot-toast";

interface iSepaDataStore {
  loading: boolean;
  sepaData: [];
  getSepaData: () => void;
  SetSepaDataExported: (branchUserMemberShipId: number) => void;
}

const useStore = create<iSepaDataStore>((set, get) => ({
  loading: false,
  sepaData: [],

  getSepaData: () => {
    set({
      loading: true,
    });
    api("/api/sepa-data")
      .then((response) => {
        set({
          sepaData: response.data.sepaChanges,
          loading: false,
        });
      })
      .catch(() => {
        set({
          sepaData: [],
          loading: false,
        });
      });
  },

  SetSepaDataExported: (branchUserMemberShipId) => {
    set({
      loading: true,
    });
    api
      .put(`/api/sepa-data/exported/${branchUserMemberShipId}`)
      .then((response) => {
        set({
          loading: false,
        });
        get().getSepaData();
        toast.success(response.data?.message, { position: "bottom-right" });
      })
      .catch((error) => {
        set({
          loading: false,
        });
        toast.error(error.message, { position: "bottom-right" });
      });
  },
}));

export default useStore;
