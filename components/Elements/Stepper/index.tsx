import React, {useState} from 'react';
import tw from 'twin.macro';
import iStep from './iStep';
import Step from './Step';

const Container = tw.div`
`;

type iStepper = {
    steps: iStep[]
};
const Stepper = ({steps}: iStepper) => {
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = (step: iStep) => {
        step?.nextStep?.action && step.nextStep?.action();
        if(currentStep < steps.length -1) {
            setCurrentStep(currentStep + 1)
        }
    };

    const previousStep = (step: iStep) => {
        step?.previousStep?.action &&  step.previousStep?.action();
        setCurrentStep(currentStep - 1);
    };

    return (
        <Container>
            {steps.map((step, index: number) => (
                <Step
                    key={index}
                    index={index}
                    step={step}
                    nextStep={nextStep}
                    currentStep={currentStep}
                    previousStep={previousStep}
                    stepsLength={steps.length}
                />
            ))}
        </Container>
    );
};

export default Stepper;
