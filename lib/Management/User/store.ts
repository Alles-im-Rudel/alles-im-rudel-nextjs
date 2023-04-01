import {create} from "zustand";
import {apiFetch, Endpoint} from "../../api";
import iOptions from "../../../Interfaces/iOptions";


interface iUserStore {
    loading: boolean;
    users: [];
    getUsers: () => void;
    options: iOptions;
    setOptions: (key: string, value: number | string | boolean) => void;
}

const useStore = create<iUserStore>((set, get) => ({
    loading: false,
    users: [],
    options: {
        perPage: 10,
        page: 1,
        withOnlyTrashed: false,
        sortBy: "firstName",
        total: 0,
    },

    getUsers: () => {
        set({
            loading: true,
        });
        const options = get().options;

        apiFetch(`/users/?sortBy=${options.sortBy}&perPage=${options.perPage}&page=${options.page}&withOnlyTrashed=${options.withOnlyTrashed}`, Endpoint.backend)
            .then((response) => {
                set({
                    users: response.data,
                    options: {
                        ...options,
                        perPage: response.meta.per_page,
                        total: response.meta.total,
                    },
                    loading: false,
                })
            })
            .catch(() => {
                set({
                    users: [],
                    loading: false,
                })
            });
    },

    setOptions: (key, value) => {
        const options = get().options;
        if(key === "perPage") {
            set({
                options: {
                    ...options,
                    page: 1,
                    perPage: parseInt(value)
                }
            })
        }
        set({
            options: {
                ...options,
                [key]: value
            }
        })
    }
}));

export default useStore;
