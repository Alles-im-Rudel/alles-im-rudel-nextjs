import React, { ReactElement } from "react";
import tw from "twin.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import styled from "@emotion/styled";

const ExpandableContainer = styled.details`
  &[open] summary > svg {
    transform: rotate(180deg);
  }
`;

interface ExpandableProps {
  children: string | ReactElement | ReactElement[];
}
const Expandable = ({ children }: ExpandableProps) => {
  return <ExpandableContainer>{children}</ExpandableContainer>;
};

export default Expandable;

const Header = styled.summary`
  &::-webkit-details-marker {
    display: none;
  }
  ${tw`
    cursor-pointer
    flex
    justify-between
    p-smaller
  `}
`;

interface ExpandableHeaderProps {
  children: string | ReactElement;
}
function ExpandableHeader({ children }: ExpandableHeaderProps) {
  return (
    <Header>
      {children}
      <FontAwesomeIcon icon={faChevronDown} />
    </Header>
  );
}

const Body = styled.div`
  display: grid;
  ${tw`
    p-smaller
  `}
`;

interface ExpandableBodyProps {
  children: string | ReactElement;
}
function ExpandableBody({ children }: ExpandableBodyProps) {
  return <Body>{children}</Body>;
}

Expandable.Header = ExpandableHeader;
Expandable.Body = ExpandableBody;
