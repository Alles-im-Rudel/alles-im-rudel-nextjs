import React from "react";
import ColumnRow from "./ColumnRow";
import { TextButton } from "../../Button";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import tw from "twin.macro";
import styled from "@emotion/styled";

type iStyledIcon = {
  isExpanded: boolean;
};
const StyledIcon = styled(FontAwesomeIcon)<iStyledIcon>`
  ${tw`
        transition-all
  `};
  ${({ isExpanded }) => isExpanded && tw`rotate-90`};
`;

interface iExpandButton {
  isExpanded: boolean;
  setIsExpanded: any;
}
const ExpandButton = ({ isExpanded, setIsExpanded }: iExpandButton) => {
  return (
    <ColumnRow>
      <TextButton onClick={() => setIsExpanded(!isExpanded)}>
        <StyledIcon icon={faChevronRight} isExpanded={isExpanded} />
      </TextButton>
    </ColumnRow>
  );
};

export default ExpandButton;
