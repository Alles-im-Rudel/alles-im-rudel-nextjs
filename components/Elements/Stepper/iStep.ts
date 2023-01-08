import {ReactElement} from "react";

export interface iStep {
    headline: string,
    element: ReactElement,
    nextStep: {
        text: string,
        action: Function
    },
    previousStep: {
        text: string,
        action: Function
    } | undefined,
}

export default iStep;
