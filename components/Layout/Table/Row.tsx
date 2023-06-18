import React, { useState } from "react";
import { StyledTd, StyledTr } from "./Table";

const Row = ({ item, headers, getColumnData }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const getRowData = () => {
    return headers
      .find((header) => header.value === "expansion")
      ?.expantion(item, headers.length);
  };

  return (
    <>
      <StyledTr>
        {headers.map((header, index) => {
          return (
            <>
              <StyledTd key={header.value}>
                {getColumnData(item, index, isExpanded, setIsExpanded)}
              </StyledTd>
            </>
          );
        })}
      </StyledTr>
      {isExpanded && <StyledTr>{getRowData()}</StyledTr>}
    </>
  );
};

export default Row;
