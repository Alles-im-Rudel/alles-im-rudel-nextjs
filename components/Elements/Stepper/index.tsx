import React from 'react';
import tw from 'twin.macro';
import iStep from './iStep';
import Step from './Step';
import useStepStore from "./store";
import shallow from "zustand/shallow";

const Container = tw.div`
`;

type iStepper = {
    steps: iStep[]
};
const Stepper = ({steps}: iStepper) => {

    const [
        setSteps,
    ] = useStepStore((state) => [
        state.setSteps,
    ], shallow);

    setSteps(steps);

    return (
        <Container>
            {steps.map((step, index: number) => (
                <Step
                    key={index}
                    index={index}
                    step={step}
                    stepsLength={steps.length}
                />
            ))}
        </Container>
    );
};

export default Stepper;
