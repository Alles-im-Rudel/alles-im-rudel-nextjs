import React from "react";
import tw from "twin.macro";
import styled from "@emotion/styled";
import _link, { LinkProps } from "next/link";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import getBackgroundColor, { Color } from "./BackgroundColor";
import HoverContainer from "./HoverContainer";

export const buttonStyle = tw`
    rounded
    w-fit
    overflow-hidden
`;

const RotateFontAwesomeIcon = tw(FontAwesomeIcon)`
    animate-rotate
`;

type iStyledTextLink = {
  black?: boolean;
  disabled?: boolean;
};
const StyledTextLink = styled(_link)<iStyledTextLink>`
  ${({ black }) => black && tw`text-black`};
  ${buttonStyle}
`;

const StyledTextButton = styled.button<iStyledTextLink>`
  ${buttonStyle}
  ${tw`
      h-fit
      bg-inherit
  `}
  ${({ black }) => black && tw`text-black`};
`;

interface iStyledButton {
  css?: unknown;
  color: Color;
}
const StyledButton = styled.button<iStyledButton>`
  ${buttonStyle}
  ${({ color }) => getBackgroundColor(color)}
`;
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  color?: Color;
  children: any;
}
const Button: React.FC<ButtonProps> = ({
  color = Color.primary,
  isLoading,
  children,
  ...props
}) => {
  return (
    <StyledButton color={color} {...props}>
      <HoverContainer>
        {isLoading ? <RotateFontAwesomeIcon icon={faSpinner} /> : children}
      </HoverContainer>
    </StyledButton>
  );
};
export default Button;

interface TextButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  black?: boolean;
  children: any;
}
export const TextButton = ({ black, children, ...props }: TextButtonProps) => {
  return (
    <StyledTextButton black={black} {...props}>
      <HoverContainer>{children}</HoverContainer>
    </StyledTextButton>
  );
};

interface iStyledLink {
  css?: unknown;
  color: Color;
}
const StyledLink = styled(_link)<iStyledLink>`
  ${buttonStyle}
  ${({ color }) => getBackgroundColor(color)}
`;
interface iLinkProps extends LinkProps {
  color?: Color;
  children: any;
}
export const Link = ({
  color = Color.primary,
  children,
  ...props
}: iLinkProps) => {
  return (
    <StyledLink color={color} {...props}>
      <HoverContainer>{children}</HoverContainer>
    </StyledLink>
  );
};

interface TextLinkProps extends LinkProps {
  black?: boolean;
  children: any;
}

export const TextLink = ({
  black = false,
  children,
  ...props
}: TextLinkProps) => {
  return (
    <StyledTextLink black={black} {...props}>
      <HoverContainer>{children}</HoverContainer>
    </StyledTextLink>
  );
};
