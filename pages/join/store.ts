import create from "zustand";
import {iWhoAreYouForm} from "./steps/StepWhoAreYou"
import {iWhereAreYouForm} from "./steps/StepWhereAreYou";
import {iBackendBranche} from "../../Interfaces/iBranche";
import {iHowToPayForm} from "./steps/StepHowToPay";
import {iChoosPasswordForm} from "./steps/StepChoosePassword";
import {iOverviewForm} from "./steps/StepOverview";

export interface iForm {
    salutation: string;
    firstName: string;
    lastName: string;
    phone: string;
    birthday: string;
    email: string;
    street: string;
    postcode: string;
    city: string;
    country: string;
    branchIds: number[];
    mandat: iHowToPayForm;
    hasAcceptedDataProtection: boolean;
    hasAcceptedMonthlyDebits: boolean;
    wantsEmailNotification: boolean;
}

interface iJoinStore {
    form: iForm;
    branches: iBackendBranche[] | [];
    setForm: (form: iWhoAreYouForm | iWhereAreYouForm | { branchIds: number[] } | { mandat: iHowToPayForm } | iChoosPasswordForm | iOverviewForm) => void;
    setBranches: (branches: iBackendBranche[]) => void;
    submit: () => void;
}

const useStore = create<iJoinStore>((set, get) => ({
    form: {
        salutation: "",
        firstName: "",
        lastName: "",
        phone: "",
        birthday: "",
        email: "",
        street: "",
        postcode: "",
        city: "",
        country: "",
        branchIds: [1],
        mandat: {
            firstName: "",
            lastName: "",
            street: "",
            postcode: "",
            city: "",
            country: "",
            iban: "",
            bic: "",
            location: "",
            signature: "",
        },
        hasAcceptedDataProtection: false,
        hasAcceptedMonthlyDebits: false,
        wantsEmailNotification: false,
    },

    branches: [],

    setForm: (form) => {
        set({
            form: {
                ...get().form,
                ...form
            }
        })
    },
    setBranches: (branches) => {
        set({
            branches: branches
        })
    },

    submit: () => {

    },

}));

export default useStore;
