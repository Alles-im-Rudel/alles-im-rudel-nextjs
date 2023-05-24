import React from "react";
import { StyledTr } from "./Table";
import tw from "twin.macro";

const NoDataFound = tw.div`
  flex
  justify-center
  text-small
  text-small 
  p-1
`;

interface iTableNoData {
  headersLength: number;
  message?: string;
}
const TableNoData = ({
  headersLength,
  message = "Keine Daten gefunden",
}: iTableNoData) => {
  return (
    <StyledTr>
      <td colSpan={headersLength}>
        <NoDataFound>{message}</NoDataFound>
      </td>
    </StyledTr>
  );
};

export default TableNoData;
