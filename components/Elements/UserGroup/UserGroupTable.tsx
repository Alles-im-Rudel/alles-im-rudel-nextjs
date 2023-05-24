import React, { useEffect } from "react";
import Table, { iHeader } from "../../Layout/Table/Table";
import useClientTable from "../../../hooks/useClientTable";

interface iUserGroupTable {
  headers: iHeader[];
  data: any[];
}
const UserGroupTable = ({ headers, data = [] }: iUserGroupTable) => {
  const { pageData, options, handleSetOptions, setData } = useClientTable();

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

export default UserGroupTable;
