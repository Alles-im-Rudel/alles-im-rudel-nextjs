import {css} from '@emotion/react';
import React, {useState} from 'react';
import tw from 'twin.macro';
import styled from "@emotion/styled";
import _link, {LinkProps} from "next/link";
import {faRightFromBracket, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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

const RotateFontAwesomeIcon = tw(FontAwesomeIcon)`
    animate-rotate
`;

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

type StyledTextLink = {
    black?: boolean
    disabled?: boolean
}
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
    isLoading?: boolean;
    children: any;
}

const Button: React.FC<ButtonProps> = ({greyBlue, secondary,isLoading, children, ...props}) => {
    const [colorCss, setColorCss] = useState<any>(stylePrimary);
    if(greyBlue) {
        setColorCss(greyBlueBg);
    }
    if(secondary) {
        setColorCss(secondaryBg);
    }

    return (
        <StyledButton css={colorCss} {...props}>
            <HoverContainer>
                {isLoading ? <RotateFontAwesomeIcon icon={faSpinner} /> : children}
            </HoverContainer>
        </StyledButton>
    );
};

export default Button;

interface TextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    black?: boolean;
    children: any;
}
export const TextButton = ({black, children, ...props}: TextButtonProps) => {
    return (
        <StyledTextButton black={black} {...props}>
            <HoverContainer>
                {children}
            </HoverContainer>
        </StyledTextButton>
    );
};

interface iLinkProps extends LinkProps {
    greyBlue?: boolean;
    children: any;
}
export const Link = ({greyBlue, children, ...props}: iLinkProps) => {
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

interface TextLinkProps extends LinkProps {
    black?: boolean;
    children: any;
}
export const TextLink = ({black = false, children, ...props}: TextLinkProps) => {
    return (
        <StyledTextLink black={black} {...props}>
            <HoverContainer>
                {children}
            </HoverContainer>
        </StyledTextLink>
    );
};
