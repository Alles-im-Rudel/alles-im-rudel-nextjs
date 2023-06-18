import tw from "twin.macro";
import styled from "@emotion/styled";

export default styled.div`
  ${tw`
    flex
    gap-x-6
    flex-col
  `};
  @container formContainer (min-width: 400px) {
    flex-direction: row;
  }
`;
