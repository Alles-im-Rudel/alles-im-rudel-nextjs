import React from "react";
import tw from "twin.macro";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

const Container = tw.div`
  bg-white
  p-small
  @container/textGrid
`;

const Grid = tw.div`
  flex
  flex-col
  gap-small
  @4xl/textGrid:grid
  @4xl/textGrid:grid-cols-2
  @5xl/textGrid:grid-cols-12
`;

export const Item = tw.div`
    bg-primary
    text-textWhite
    text-text
    rounded-base
    rounded-tr-none
    p-small
    flex
    justify-center
    items-center
    h-full
    min-w-[15rem]
`;

interface iStyledElement {
  colspan: number;
  rowspan: number;
}
const StyledElement = styled.div<iStyledElement>`
  @container textGrid (min-width: 64rem) {
    ${({ colspan, rowspan }) => css`
      grid-column: span ${colspan} / span ${colspan};
      grid-row: span ${rowspan} / span ${rowspan};
    `}
  }
  @container textGrid(min-width: 56rem) {
    grid-row: span 1 / span 1;
    grid-column: span 1 / span 1;
  }
  ${tw`
    text-primary
  `}
`;

interface iGridElement {
  col?: number;
  row?: number;
  children: ReactJSXElement | string;
}
const GridElement = ({ col = 1, row = 1, children }: iGridElement) => {
  return (
    <StyledElement colspan={col} rowspan={row}>
      {children}
    </StyledElement>
  );
};

const TextGrid = ({ data }: any) => {
  return (
    <Container>
      <Grid>
        <GridElement col={5}>
          <Item>{data[0].text}</Item>
        </GridElement>
        <GridElement col={4}>
          <Item>{data[1].text}</Item>
        </GridElement>
        <GridElement col={3} row={2}>
          <Item>{data[2].text}</Item>
        </GridElement>
        <GridElement col={3}>
          <Item>{data[3].text}</Item>
        </GridElement>
        <GridElement col={3}>
          <Item>{data[4].text}</Item>
        </GridElement>
        <GridElement col={3}>
          <Item>{data[5].text}</Item>
        </GridElement>
        <GridElement col={6}>
          <Item>{data[6].text}</Item>
        </GridElement>
        <GridElement col={6}>
          <Item>{data[7].text}</Item>
        </GridElement>
      </Grid>
    </Container>
  );
};

export default TextGrid;
