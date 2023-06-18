import { create } from "zustand";
import iOptions from "../../../Interfaces/iOptions";
import { api } from "../../axios";

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

interface iBranchMembersStore {
  loading: boolean;
  members: [];
  getBranchMembers: () => void;
  reject: (id: number) => void;
  accept: (id: number) => void;
  options: iOptions;
  filters: iFilters;
  setOptions: (
    key: string,
    value: number | string | boolean | PerPageEnum
  ) => void;
  setFilters: (key: string, value: number | string | boolean | null) => void;
}

const useStore = create<iBranchMembersStore>((set, get) => ({
  loading: false,
  members: [],
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

  getBranchMembers: () => {
    set({
      loading: true,
    });
    const options = get().options;
    const filters = get().filters;
    const params = {
      search: filters.search,
      perPage: options.perPage,
      page: options.page,
    };
    api("/api/manage-branch-applications", { params })
      .then((response) => {
        set({
          members: response.data.data,
          options: {
            ...options,
            perPage: parseInt(response.data.meta.per_page),
            total: response.data.meta.total,
          },
          loading: false,
        });
      })
      .catch(() => {
        set({
          members: [],
          loading: false,
        });
      });
  },

  reject: (id) => {
    set({
      loading: true,
    });
    api
      .put(`/api/manage-member-ship-applications/reject/${id}`)
      .then((response) => {
        get().getMembers();
      })
      .finally(() => set({ loading: false }));
  },

  accept: (id) => {
    set({
      loading: true,
    });
    api
      .put(`/api/manage-member-ship-applications/accept/${id}`)
      .then((response) => {
        get().getMembers();
      })
      .finally(() => set({ loading: false }));
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
}));

export default useStore;
