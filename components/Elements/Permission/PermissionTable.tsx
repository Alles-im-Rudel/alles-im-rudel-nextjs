import React, { useEffect } from "react";
import Table, { iHeader } from "../../Layout/Table/Table";
import useClientTable from "../../../hooks/useClientTable";

interface iPermissionTable {
  headers: iHeader[];
  data: any[];
}
const PermissionTable = ({ headers, data = [] }: iPermissionTable) => {
  const { pageData, options, handleSetOptions, setData } = useClientTable(data);

  useEffect(() => {
    setData(data);
  }, [data]);

  return (
    <Table
      headers={headers}
      data={pageData}
      keyValue="id"
      options={options}
      setOptions={handleSetOptions}
    />
  );
};

export default PermissionTable;
