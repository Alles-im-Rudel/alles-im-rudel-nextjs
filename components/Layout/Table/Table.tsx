import React, { JSXElementConstructor, ReactElement } from "react";
import tw from "twin.macro";
import LoadingBar from "../LoadingBar";
import TableFooter from "./TableFooter";
import iOptions from "../../../Interfaces/iOptions";
import TableHeader from "./TableHeader";
import { PerPageEnum } from "../../../lib/Management/User/store";
import TableNoData from "./TableNoData";
import { css } from "@emotion/react";
import Row from "./Row";

const StyledTable = tw.table`
    w-full
    border-collapse
`;

const StyledTrHeading = tw.tr`
    border-b
    border-secondary
    bg-white
`;

export const StyledTr = tw.tr`
    border-b
    border-secondary
    bg-white
    hover:brightness-hover
`;

const StyledTh = tw.th`
    text-left
    text-base
    font-normal
    p-1
`;

export const StyledTd = tw.td`
    text-small 
    p-1
`;

export type iHeader = {
  text: string;
  value: string;
  sortable?: boolean;
  expandable?: boolean;
  transform?: (item: any, isExpanded?: boolean, setIsExpanded?: any) => any;
};

interface iTable {
  headers: iHeader[];
  headline?: ReactElement | string;
  data: any[];
  keyValue: string;
  loading?: boolean;
  options: iOptions;
  setOptions: (
    key: string,
    value: number | string | boolean | PerPageEnum
  ) => void;
}

const Table = ({
  headers,
  headline,
  data,
  loading = false,
  keyValue,
  options = {
    perPage: PerPageEnum.ten,
    page: 1,
    sortBy: "",
    total: 0,
  },
  setOptions,
}: iTable) => {
  const getColumnData = (
    item: any,
    index: number,
    isExpanded?: boolean,
    setIsExpanded?: any
  ) => {
    const header = headers[index];
    if (header?.transform) {
      return header.transform(item, isExpanded, setIsExpanded);
    }
    return item[header?.value];
  };

  return (
    <>
      {headline && <TableHeader>{headline}</TableHeader>}
      <StyledTable>
        <thead>
          <StyledTrHeading>
            {headers.map((header) => (
              <StyledTh key={header.value}>{header.text}</StyledTh>
            ))}
          </StyledTrHeading>
          <tr>
            <td colSpan={headers.length}>
              <LoadingBar loading={loading} />
            </td>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <TableNoData headersLength={headers.length} />
          ) : (
            data.map((item) => {
              return (
                <Row
                  key={item[keyValue]}
                  item={item}
                  headers={headers}
                  getColumnData={getColumnData}
                />
              );
            })
          )}
        </tbody>
      </StyledTable>
      <TableFooter options={options} setOptions={setOptions} />
    </>
  );
};
export default Table;
