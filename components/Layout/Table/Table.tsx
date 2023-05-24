import React, { ReactElement } from "react";
import tw from "twin.macro";
import LoadingBar from "../LoadingBar";
import TableFooter from "./TableFooter";
import iOptions from "../../../Interfaces/iOptions";
import TableHeader from "./TableHeader";
import { PerPageEnum } from "../../../lib/Management/User/store";
import TableNoData from "./TableNoData";

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

const StyledTd = tw.td`
    text-small 
    p-1
`;

export type iHeader = {
  text: string;
  value: string;
  sortable?: boolean;
  transform?: (item: any) => any;
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
  const getColumnData = (item: any, index: number) => {
    const header = headers[index];
    if (header?.transform) {
      return header.transform(item);
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
                <StyledTr key={item[keyValue]}>
                  {headers.map((header, index) => {
                    return (
                      <StyledTd key={header.value}>
                        {getColumnData(item, index)}
                      </StyledTd>
                    );
                  })}
                </StyledTr>
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
