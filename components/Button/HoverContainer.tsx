import styled from "@emotion/styled";
import tw from "twin.macro";

interface iHoverContainer {
  css?: unknown;
}
const HoverContainer = styled.div<iHoverContainer>`
  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  :active {
    background-color: rgba(255, 255, 255, 0.1);
  }
  ${tw`
    uppercase
    text-base
    py-1
    px-2
  `};
`;

export default HoverContainer;
