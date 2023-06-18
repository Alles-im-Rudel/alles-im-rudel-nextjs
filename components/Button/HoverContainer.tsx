import styled from "@emotion/styled";
import tw from "twin.macro";
import { css } from "@emotion/react";

interface iHoverContainer {
  css?: unknown;
  disabled?: boolean;
}
const HoverContainer = styled.div<iHoverContainer>`
  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  :active {
    background-color: rgba(255, 255, 255, 0.1);
  }
  ${(p) =>
    p.disabled &&
    css`
      background-color: rgba(255, 255, 255, 0.4);
      :hover {
        background-color: rgba(255, 255, 255, 0.4);
      }
    `};
  ${tw`
    uppercase
    text-base
    py-1
    px-2
  `};
`;

export default HoverContainer;
