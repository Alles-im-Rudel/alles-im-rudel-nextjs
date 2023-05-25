import { create } from "zustand";
import { apiFetch, Endpoint } from "../api";
import iLevel from "../../Interfaces/iLevel";

interface iLevelStore {
  loading: boolean;
  levels: iLevel[];
  getLevels: () => void;
}

const useStore = create<iLevelStore>((set, get) => ({
  loading: false,
  levels: [],

  getLevels: () => {
    if (get().levels.length <= 0) {
      set({
        loading: true,
      });
      apiFetch(`/levels`, Endpoint.backend)
        .then((response) => {
          set({
            levels: response.data,
            loading: false,
          });
        })
        .catch(() => {
          set({
            levels: [],
            loading: false,
          });
        });
    }
  },
}));

export default useStore;
