import {create} from "zustand";
import { apiFetch, Endpoint } from "../api";
import {iBackendBranche} from "../../Interfaces/iBranche";

interface iUserStore {
    loading: boolean;
    branches: iBackendBranche[];
    getBranches: () => void;
}

const useStore = create<iUserStore>((set, get) => ({
    loading: false,
    branches: [],

    getBranches: () => {
        set({
            loading: true,
        });

        apiFetch(`/branches`, Endpoint.backend)
            .then((response) => {
                set({
                    branches: response.data,
                    loading: false,
                })
            })
            .catch(() => {
                set({
                    branches: [],
                    loading: false,
                })
            });
    },

}));

export default useStore;
