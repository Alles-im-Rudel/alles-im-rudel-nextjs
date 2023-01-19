import React, { MouseEventHandler } from "react";

import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

const topOpen = keyframes`
  0% {
    left: 0;
    transform: rotate(0);
  }
  50% {
    left: -5px;
    transform: rotate(22.5deg);
  }
  100% {
    left: -8px;
    top: 0;
    width: 45%;
    transform: rotate(45deg);
  }
`;

const topClose = keyframes`
  0% {
    bottom: 0;
    left: -11px;
    top: -2px;
    transform: rotate(45deg);
  }
  50% {
    left: -5px;
    transform: rotate(22.5deg);
  }
  100% {
    left: 0;
    transform: rotate(0);
  }
`;

const middleOpen = keyframes`
  0% {
    right: 0;
    transform: rotate(0);
  }
  100% {
    width: 110%;
    right: -5px;
    top: -2px;
    transform: rotate(-45deg);
  }
`;

const middleClose = keyframes`
 0% {
      width: 110%;
      right: -5px;
      top: -2px;
      transform: rotate(-45deg);
    }
    100% {
       right: 0;
       width: 75%;
       transform: rotate(0);
    }
`;

const bottomOpen = keyframes`
  0% {
    top: 0;
    transform: rotate(0);
  }
  100% {
    bottom: 0;
    top: -4px;
    left: 3px;
    width: 45%;
    transform: rotate(45deg);
  }
`;

const bottomClose = keyframes`
  0% {
    bottom: 0;
    top: -4px;
    left: 3px;
    width: 45%;
    transform: rotate(45deg);
  }
  100% {
    top: 0;
    width: 100%;
    transform: rotate(0);
  }
`;

interface iNavIconContainer {
    css?: unknown
}
const NavIconContainer = styled.div<iNavIconContainer>`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;
    width: 25px;
    height: 25px;
    cursor: pointer;

    span {
        position: relative;
        display: block;
        height: 3px;
        background-color: white;
        border-radius: 5px;
        transition: all 0.3s;
    }

    span:nth-of-type(1) {
        width: 50%;
        border-radius: 5px;

        &.open-animation {
            animation: linear 0.3s ${topOpen} forwards;
        }

        &.close-animation {
            animation: linear 0.3s ${topClose};
        }
    }

    span:nth-of-type(2) {
        width: 75%;
        border-radius: 5px;

        &.open-animation {
            animation: linear 0.3s ${middleOpen} forwards;
        }

        &.close-animation {
            animation: linear 0.3s ${middleClose};
        }
    }

    span:nth-of-type(3) {
        width: 100%;
        border-radius: 5px;

        &.open-animation {
            animation: linear 0.3s ${bottomOpen} forwards;
        }

        &.close-animation {
            animation: linear 0.3s ${bottomClose};
        }
    }
`;

type iAnimatedBurgerIcon = {
    handleClick: MouseEventHandler<HTMLDivElement> | undefined,
    isActive: boolean
}
const AnimatedBurgerIcon = ({ handleClick, isActive }: iAnimatedBurgerIcon) => {
    return (
        <NavIconContainer onClick={handleClick} css={tw`md:hidden`}>
            <span
                className={
                    isActive === null
                        ? ""
                        : isActive
                            ? "open-animation"
                            : "close-animation"
                }
            />
            <span
                className={
                    isActive === null
                        ? ""
                        : isActive
                            ? "open-animation"
                            : "close-animation"
                }
            />
            <span
                className={
                    isActive === null
                        ? ""
                        : isActive
                            ? "open-animation"
                            : "close-animation"
                }
            />
        </NavIconContainer>
    );
};

export default AnimatedBurgerIcon;
