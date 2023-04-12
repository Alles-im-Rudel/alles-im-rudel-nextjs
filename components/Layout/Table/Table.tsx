import React from "react";
import tw from "twin.macro";
import LoadingBar from "../LoadingBar";
import TableFooter from "./TableFooter";
import iOptions from "../../../Interfaces/iOptions";
import TableHeader from "./TableHeader";
import Search from "../../Form/Search";
import { iFilters, PerPageEnum } from "../../../lib/Management/User/store";
import Button from "../../Button";
import BranchSelect from "../../Elements/Branch/BranchSelect";
import { Color } from "../../Button/BackgroundColor";

const StyledTable = tw.table`
    w-full
    border-collapse
`;

const StyledTrHeading = tw.tr`
    border-b
    border-secondary
    bg-white
`;

const StyledTr = tw.tr`
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
  data: any[];
  keyValue: string;
  loading: boolean;
  options: iOptions;
  filters: iFilters;
  setOptions: (
    key: string,
    value: number | string | boolean | PerPageEnum
  ) => void;
  setFilters: (key: string, value: number | string | boolean | null) => void;
}

const Table = ({
  headers,
  data,
  loading,
  keyValue,
  options,
  filters,
  setOptions,
  setFilters,
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
      <TableHeader>
        Benutzerverwaltung
        <Search submit={(data) => setFilters("search", data.search)} />
        <BranchSelect
          selectedBranch={filters.branchId}
          setBranch={(branchId) => setFilters("branchId", branchId)}
        />
        <Button color={Color.secondary} onClick={() => console.log("Download")}>
          Excel Download
        </Button>
      </TableHeader>
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
          {data.map((item) => {
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
          })}
        </tbody>
      </StyledTable>
      <TableFooter options={options} setOptions={setOptions} />
    </>
  );
};
export default Table;
