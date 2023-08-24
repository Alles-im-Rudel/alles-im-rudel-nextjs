import React, { useEffect } from "react";
import Table from "../../../components/Layout/Table/Table";
import useSepaDataStore from "../../../lib/Management/SepaData/store";
import { shallow } from "zustand/shallow";
import useClientTable from "../../../hooks/useClientTable";
import { date } from "../../../lib/dates";
import ExpandButton from "../../Layout/Table/ExpandButton";
import SepaRow from "./SepaRow";

const SepaData = () => {
  const [loading, sepaData, getSepaData] = useSepaDataStore(
    (state) => [state.loading, state.sepaData, state.getSepaData],
    shallow
  );

  const { pageData, options, handleSetOptions, setData } = useClientTable();

  useEffect(() => {
    if (!loading) {
      getSepaData();
    }
  }, []);

  useEffect(() => {
    setData(sepaData);
  }, [sepaData]);

  // @ts-ignore
  const tableHeaders = [
    {
      text: "Name",
      value: "user.fullName",
      transform: (item: any) => item.user.fullName,
    },
    {
      text: "IBAN",
      value: "user.bankAccount.iban",
      transform: (item: any) => item.user.bankAccount.iban,
    },
    {
      text: "Mandatsreferenz",
      value: "mandate",
    },
    {
      text: "Mandatsdatum",
      value: "mandateDate",
      transform: (item: any) => date(item.mandateDate),
    },
    {
      text: "Betrag in Euro",
      value: "value",
    },
    {
      text: "Action",
      value: "expansion",
      sortable: false,
      transform: (item: any, isExpanded: any, setIsExpanded: any) => (
        <ExpandButton isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      ),
      expantion: (item: any, headerLength: number) => (
        <SepaRow
          branchUserMemberShips={item.user.branchUserMemberShips}
          headerLength={headerLength}
        />
      ),
    },
  ];
  return (
    <Table
      headers={tableHeaders}
      data={pageData}
      keyValue="id"
      loading={loading}
      options={options}
      setOptions={handleSetOptions}
    />
  );
};

export async function getStaticProps() {
  return {
    props: {
      protected: true,
      permission: "members.index",
    },
  };
}

export default SepaData;
