import { create } from "zustand";
import { apiFetch, Endpoint } from "../api";
import { iBackendBranche } from "../../Interfaces/iBranche";

interface iBranchStore {
  loading: boolean;
  branches: iBackendBranche[];
  getBranches: () => void;
}

const useStore = create<iBranchStore>((set, get) => ({
  loading: false,
  branches: [],

  getBranches: () => {
    if (get().branches.length <= 0) {
      set({
        loading: true,
      });
      apiFetch(`/branches`, Endpoint.backend)
        .then((response) => {
          set({
            branches: response.data,
            loading: false,
          });
        })
        .catch(() => {
          set({
            branches: [],
            loading: false,
          });
        });
    }
  },
}));

export default useStore;
