import React, {useRef} from 'react';
import Headline from "../../Layout/Headline";
import Button from "../../Button";
import tw from "twin.macro";
import iStep from "./iStep";
import styled from '@emotion/styled';
import {css} from '@emotion/react';

const StepWrapper = tw.div`

`;
type iStepActiveWrapper = {
    isActive: boolean
}
const StepActiveWrapper = styled.div<iStepActiveWrapper>`
  ${({isActive}) => isActive ? css`display: block` : css`display: none`};
  ${tw`
    transition-all
    overflow-hidden
  `}
`;

const StepElementWrapper = tw.div`

`;

const HeadlineWrapper = tw.div`
    flex
    items-center
    gap-3
`;

type iStepContent = {
    isLast: boolean
}
const StepContent = styled.div<iStepContent>`
  ${tw`
     m-2
    px-6
    min-h-[30px]
  `};
  ${({isLast}) => isLast ? tw`border-none` : tw`border-l`}
`;

type iStepIndicator = {
    isActive: boolean
}
const StepIndicator = styled.div<iStepIndicator>`
  ${({isActive}) => isActive ? tw`bg-primary` : tw`bg-secondary`}
  ${tw`
    text-white
    rounded-full
    text-small
    h-5
    w-5
    flex
    justify-center
    items-center
  `}
`;

type iActionRow = {
    end: boolean
}
const ActionRow = styled.div<iActionRow>`
  ${({end}) => end ? tw`justify-end` : tw`justify-between`}
  ${tw`
    flex
    mt-4
  `}
`;

type iStepElement = {
    step: iStep,
    currentStep: number,
    previousStep: Function,
    nextStep: Function,
    index: number,
    stepsLength: number,
}
const Step = ({step, currentStep, previousStep, nextStep, index, stepsLength}: iStepElement) => {
    const ref = useRef(null);

    const isActive = index === currentStep;

    /*const handleExpend = () => {
        if (ref.current) {
            const height = ref.current?.style.maxHeight;
            console.log(index, ref.current?.style);
            console.log(index, height, isActive);
            if (height && height == "0px" || height.length == 0) {
                ref.current.style.maxHeight = `${ref.current.scrollHeight + 32}px`;
            } else {
                ref.current.style.maxHeight = `0px`;
            }
        }
    }*/

    const handleClickNext = () => {
        /*handleExpend()*/
        nextStep(step)
    }

    const handleClickPrevious = () => {
        /*handleExpend()*/
        previousStep(step)
    }
    console.log(stepsLength -1, index)

    return (
        <StepWrapper>
            <HeadlineWrapper>
                <StepIndicator isActive={isActive}>{index + 1}</StepIndicator>
                <Headline headline={4}>{step.headline}</Headline>
            </HeadlineWrapper>
            <StepContent isLast={stepsLength -1  === index}>
                <StepActiveWrapper ref={ref} isActive={isActive}>
                    <StepElementWrapper>
                        {step.element}
                    </StepElementWrapper>
                    <ActionRow end={!step.previousStep}>
                        {step.previousStep &&
                          <Button onClick={handleClickPrevious}>{step.previousStep?.text}</Button>}
                        <Button onClick={handleClickNext}>{step.nextStep.text}</Button>
                    </ActionRow>
                </StepActiveWrapper>
            </StepContent>
        </StepWrapper>
    );
};

export default Step;
