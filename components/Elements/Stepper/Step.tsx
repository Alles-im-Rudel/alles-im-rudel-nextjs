import React, {useRef} from 'react';
import Headline from "../../Layout/Headline";
import Button from "../../Button";
import tw from "twin.macro";
import iStep from "./iStep";
import styled from '@emotion/styled';
import {css} from '@emotion/react';
import useStepStore from "./store";
import shallow from "zustand/shallow";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCheck } from '@fortawesome/free-solid-svg-icons';

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
    border-l-secondary
  `};
  ${({isLast}) => isLast ? tw`border-none` : tw`border-l`}
`;

type iStepIndicator = {
    isActive: boolean
}
const StepIndicator = styled.div<iStepIndicator>`
  ${({isActive}) => isActive ? tw`bg-primary` : tw`bg-secondary`}
  ${tw`
    cursor-pointer
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


type iStepElement = {
    step: iStep,
    index: number,
    stepsLength: number,
}
const Step = ({step, index, stepsLength}: iStepElement) => {

    const [
        currentStep,
        setCurrentStep
    ] = useStepStore((state) => [
        state.currentStep,
        state.setCurrentStep,
    ], shallow);

    const isActive = index === currentStep;

    const handleClick = () => {
        if(index < currentStep) {
            setCurrentStep(index)
        }
    }
    return (
        <StepWrapper>
            <HeadlineWrapper>
                <StepIndicator onClick={handleClick} isActive={isActive}>{index > currentStep -1 ? index + 1 : <FontAwesomeIcon icon={faCheck} /> }</StepIndicator>
                <Headline headline={4}>{step.headline}</Headline>
            </HeadlineWrapper>
            <StepContent isLast={stepsLength - 1 === index}>
                <StepActiveWrapper isActive={isActive}>
                    <StepElementWrapper>
                        {step.element}
                    </StepElementWrapper>
                </StepActiveWrapper>
            </StepContent>
        </StepWrapper>
    );
};

export default Step;
