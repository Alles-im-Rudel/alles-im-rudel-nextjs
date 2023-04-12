import React, { ReactElement } from "react";
import styled from "@emotion/styled";
import { buttonStyle } from "../Button";
import useComponentVisible from "../../hooks/useComponentVisible";
import tw from "twin.macro";
import { css } from "@emotion/react";
import HoverContainer from "../Button/HoverContainer";
import { stylePrimary } from "../Button/BackgroundColor";

const DropdownWrapper = tw.div`
  relative
  inline-block
`;
type StyledButtonProps = {
  isVisible: boolean;
};
const StyledButton = styled.button<StyledButtonProps>`
  ${buttonStyle}
  ${stylePrimary}
`;

type ItemWrapperProps = {
  open: boolean;
};

const ItemWrapper = styled.div<ItemWrapperProps>`
  display: ${({ open }) => (open ? "flex" : "none")};
  background-color: #f9f9f9;
  ${tw`
    right-0
    flex-col
    rounded
    z-1
    min-w-fit
    w-full
    absolute
    gap-1
  `}
`;

type DropdownButtonProps = {
  items: ReactElement[];
  children: ReactElement;
};
const DropdownButton = ({ items, children, ...props }: DropdownButtonProps) => {
  const { ref, isVisible, setIsVisible } = useComponentVisible(false);
  return (
    <DropdownWrapper ref={ref}>
      <StyledButton
        isVisible={isVisible}
        onClick={() => {
          setIsVisible(!isVisible);
        }}
        {...props}
      >
        <HoverContainer
          css={
            isVisible &&
            css`
              background-color: rgba(255, 255, 255, 0.1);
            `
          }
        >
          {children}
        </HoverContainer>
      </StyledButton>
      <ItemWrapper
        open={isVisible}
        onClick={() => {
          setIsVisible(!isVisible);
        }}
      >
        {items.map((item) => item)}
      </ItemWrapper>
    </DropdownWrapper>
  );
};
export default DropdownButton;
