import {create} from "zustand";
import iStep from "./iStep";


interface iStepperStore {

    currentStep: number;
    steps: iStep[] | [];
    setCurrentStep: (step: number) => void;
    setSteps: (steps: iStep[]) => void;
    nextStep: () => void;
    previousStep: () => void;

}

const useStore = create<iStepperStore>((set, get) => ({
    currentStep: 0,
    steps: [],

    setCurrentStep: (step: number) => {
        set({currentStep: step});
    },

    setSteps: (steps) => {
        set({steps: steps});
    },

    nextStep: () => {
        if (get().currentStep < get().steps.length - 1) {
            set({currentStep: get().currentStep + 1});
        }
    },

    previousStep: () => {
        console.log(get().currentStep -1)
        set({currentStep: get().currentStep - 1});
    },
}));

export default useStore;
