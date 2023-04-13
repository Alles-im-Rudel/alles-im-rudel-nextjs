import React, { ReactElement } from "react";
import tw from "twin.macro";

const CardContainer = tw.div`
  border
  flex
  shadow-md
  flex-col
`;

export const CardHeadline = tw.div`
  p-smaller
`;

export const CardText = tw.div`
  p-smaller
`;

export const CardActions = tw.div`
  
`;

interface iCard {
  children: ReactElement | ReactElement[];
}

const Card = ({ children }: iCard) => {
  return <CardContainer>{children}</CardContainer>;
};

export default Card;
