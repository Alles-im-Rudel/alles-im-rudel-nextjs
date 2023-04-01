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
    text-base
    py-1
    px-2
  `};
`;

export const stylePrimary = css`
  ${tw`
    bg-primary
    text-white
  `};
`;

interface iStyledButton {
    css?: unknown
}

const StyledButton = styled.button<iStyledButton>`
  ${buttonStyle}
`;

interface iStyledLink {
    css?: unknown
}

const StyledLink = styled(_link)<iStyledLink>`
  ${buttonStyle}
`;

const greyBlueBg = tw`
    text-white
    bg-greyBlue
`;

const secondaryBg = tw`
    text-black
    bg-secondary
`;

type StyledTextLink = {
    black?: boolean
    disabled?: boolean
}

interface iHoverContainer {
    css?: unknown
}

export const HoverContainer = styled.div<iHoverContainer>`
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
  ${buttonStyle}
  ${tw`
      h-fit
      bg-inherit
  `}
  ${({black}) => black && tw`text-black`};
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    greyBlue?: boolean;
    secondary?: boolean;
    children: any;
}

const Button: React.FC<ButtonProps> = ({greyBlue, secondary, children, ...props}) => {
    if (greyBlue) {
        return (
            <StyledButton css={greyBlueBg} {...props}>
                <HoverContainer>
                    {children}
                </HoverContainer>
            </StyledButton>
        );
    }
    if (secondary) {
        return (
            <StyledButton css={secondaryBg} {...props}>
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
