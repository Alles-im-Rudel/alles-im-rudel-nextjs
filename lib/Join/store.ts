import {create} from "zustand";
import {iWhoAreYouForm} from "../../components/Join/steps/StepWhoAreYou"
import {iWhereAreYouForm} from "../../components/Join/steps/StepWhereAreYou";
import {iBackendBranche} from "../../Interfaces/iBranche";
import {iHowToPayForm} from "../../components/Join/steps/StepHowToPay";
import {iChoosPasswordForm} from "../../components/Join/steps/StepChoosePassword";
import {iOverviewForm} from "../../components/Join/steps/StepOverview";
import {apiFetch, Endpoint} from "../api";

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
    mandateReference: string;
    setForm: (form: iWhoAreYouForm | iWhereAreYouForm | { branchIds: number[] } | { mandat: iHowToPayForm } | iChoosPasswordForm | iOverviewForm) => void;
    setBranches: (branches: iBackendBranche[]) => void;
    submit: () => void;
    getMandateReference: () => void;
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
            date: "",
        },
        hasAcceptedDataProtection: false,
        hasAcceptedMonthlyDebits: false,
        wantsEmailNotification: false,
    },
    branches: [],
    mandateReference: "",

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

    getMandateReference: () => {
        apiFetch("/get-mandate-refernce-id", Endpoint.backend)
            .then(({data}) => {
                set({mandateReference: data})
        }).catch(() => {
            set({mandateReference: "error"})
        })
    },

    submit: () => {
        console.log(get().form)
        /*apiFetch("/member-ship-applications", Endpoint.backend, {
            // @ts-ignore
            method: "POST",
            body: JSON.stringify(get().form)
        }).then(() => {

        }).catch(() => {

        })*/

    },

}));

export default useStore;
