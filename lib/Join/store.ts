import { create } from "zustand";
import { iWhoAreYouForm } from "../../components/Join/steps/StepWhoAreYou";
import { iWhereAreYouForm } from "../../components/Join/steps/StepWhereAreYou";
import { iBackendBranche } from "../../Interfaces/iBranche";
import { iHowToPayForm } from "../../components/Join/steps/StepHowToPay";
import { iChoosePasswordForm } from "../../components/Join/steps/StepChoosePassword";
import { iOverviewForm } from "../../components/Join/steps/StepOverview";
import { apiFetch, Endpoint } from "../api";
import { api } from "../axios";

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
  accountFirstName: string;
  accountLastName: string;
  accountStreet: string;
  accountPostcode: string;
  accountCity: string;
  accountCountry: string;
  accountSignatureCity: string;
  signature: any;
  iban: string;
  bic: string;
  hasAcceptedDataProtection: boolean;
  hasAcceptedMonthlyDebits: boolean;
  wantsEmailNotification: boolean;
  password: string;
  passwordRepeat: string;
}

interface iJoinStore {
  form: iForm;
  branches: iBackendBranche[] | [];
  mandateReference: string;
  setForm: (
    form:
      | iWhoAreYouForm
      | iWhereAreYouForm
      | { branchIds: number[] }
      | iHowToPayForm
      | iChoosePasswordForm
      | iOverviewForm
  ) => void;
  setBranches: (branches: iBackendBranche[]) => void;
  submit: () => void;
  getMandateReference: () => void;
  isSuccessful: boolean;
  reset: () => void;
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
    accountFirstName: "",
    accountLastName: "",
    accountStreet: "",
    accountPostcode: "",
    accountCity: "",
    accountCountry: "",
    accountSignatureCity: "",
    signature: null,
    iban: "",
    bic: "",
    hasAcceptedDataProtection: false,
    hasAcceptedMonthlyDebits: false,
    wantsEmailNotification: false,
    password: "",
    passwordRepeat: "",
  },
  isSuccessful: false,
  branches: [],
  mandateReference: "",

  setForm: (form) => {
    set({
      form: {
        ...get().form,
        ...form,
      },
    });
  },
  setBranches: (branches) => {
    set({
      branches: branches,
    });
  },

  reset: () => {
    set({
      isSuccessful: false,
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
        accountFirstName: "",
        accountLastName: "",
        accountStreet: "",
        accountPostcode: "",
        accountCity: "",
        accountCountry: "",
        accountSignatureCity: "",
        signature: null,
        iban: "",
        bic: "",
        hasAcceptedDataProtection: false,
        hasAcceptedMonthlyDebits: false,
        wantsEmailNotification: false,
        password: "",
        passwordRepeat: "",
      },
      mandateReference: "",
    });
  },

  getMandateReference: () => {
    apiFetch("/get-mandate-refernce-id", Endpoint.backend)
      .then(({ data }) => {
        set({ mandateReference: data });
      })
      .catch(() => {
        set({ mandateReference: "error" });
      });
  },

  submit: () => {
    const form = get().form;
    const request = new FormData();
    Object.keys(form).forEach((fieldName) => {
      if (typeof form[fieldName] == "boolean") {
        request.append(fieldName, form[fieldName] ? "true" : "false");
      }
      if (fieldName === "branchIds") {
        request.append("branches", JSON.stringify(form.branchIds));
      }
      request.append(fieldName, form[fieldName]);
    });
    api
      .post(`/api/member-ship-applications`, request, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        set({
          isSuccessful: true,
        });
      })
      .catch((error) => {});
  },
}));

export default useStore;
