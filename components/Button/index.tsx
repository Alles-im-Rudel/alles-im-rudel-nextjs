import {css} from '@emotion/react';
import React from 'react';
import tw from 'twin.macro';
import styled from "@emotion/styled";
import _link from "next/link";

export const buttonStyle = tw`
    rounded
    w-fit
    overflow-hidden
`;

export const style = css`
  ${tw`
    uppercase
    py-1
    px-2
  `};
`;

export const stylePrimary = css`
  ${tw`
    bg-primary
  `};
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(_link)`
  ${buttonStyle}
`;

const greyBlueBg = tw`
    text-white
    bg-greyBlue
`;

type StyledTextLink = {
    black: null | boolean
}

export const HoverContainer = styled.div`
  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  :active {
    background-color: rgba(255, 255, 255, 0.1);
  }

  ${style}
`;

const StyledTextLink = styled(_link)<StyledTextLink>`
  ${({black}) => black && tw`text-black`};
  ${buttonStyle}
`;

const StyledTextButton = styled.button<StyledTextLink>`
  ${({black}) => black && tw`text-black`};
  ${buttonStyle} ${
          tw`h-fit`}
`;

type BottonProps = {
    greyBlue: null | boolean;
    children: any;
    props: any
}
const Button = ({greyBlue, children, ...props}: BottonProps) => {
    if (greyBlue) {
        return (
            <StyledButton css={greyBlueBg} {...props}>
                <HoverContainer>
                    {children}
                </HoverContainer>
            </StyledButton>
        );
    }
    return (
        <StyledButton css={stylePrimary} {...props}>
            <HoverContainer>
                {children}
            </HoverContainer>
        </StyledButton>
    );
};

export default Button;

export const TextButton = ({black, children, ...props}: any) => {
    return (
        <StyledTextButton black={black} {...props}>
            <HoverContainer>
                {children}
            </HoverContainer>
        </StyledTextButton>
    );
};

export const Link = ({greyBlue, children, ...props}: any) => {
    if (greyBlue) {
        return (
            <StyledLink
                css={greyBlueBg}
                {...props}
            >
                <HoverContainer>
                    {children}
                </HoverContainer>
            </StyledLink>
        );
    }
    return (
        <StyledLink
            css={stylePrimary}
            {...props}>
            <HoverContainer>
                {children}
            </HoverContainer>
        </StyledLink>
    );
};

export const TextLink = ({black, children, ...props}: any) => {
    return (
        <StyledTextLink black={black} {...props}>
            <HoverContainer>
                {children}
            </HoverContainer>
        </StyledTextLink>
    );
};
