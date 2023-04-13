import React, { ReactNode } from "react";
import tw from "twin.macro";

const StyledList = tw.ul`
    list-none
    list-inside
`;

const UnorderedList = tw.ul`
    list-disc
    list-inside
`;

const ListItem = tw.li`

`;

const Ul = ({ children }: { children: ReactNode }) => {
  return <UnorderedList>{children}</UnorderedList>;
};

export default Ul;

export const Li = ({ children }: { children: ReactNode }) => {
  return <ListItem>{children}</ListItem>;
};

export const List = ({ children }: { children: ReactNode }) => {
  return <StyledList>{children}</StyledList>;
};
