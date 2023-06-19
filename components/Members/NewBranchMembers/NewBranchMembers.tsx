import React, { useEffect } from "react";
import Table from "../../../components/Layout/Table/Table";
import useBranchMembersStore from "../../../lib/Management/BranchMembers/store";
import { shallow } from "zustand/shallow";
import ColumnRow from "../../../components/Layout/Table/ColumnRow";
import iBranchUserMemberShip from "../../../Interfaces/iBranchUserMemberShip";
import { date } from "../../../lib/dates";
import AcceptNewBranchMembersButton from "./AcceptNewBranchMembersButton";

const NewBranchMembers = () => {
  const [loading, options, filters, members, getMembers, setOptions] =
    useBranchMembersStore(
      (state) => [
        state.loading,
        state.options,
        state.filters,
        state.members,
        state.getBranchMembers,
        state.setOptions,
      ],
      shallow
    );

  useEffect(() => {
    if (!loading) {
      getMembers();
    }
  }, [
    options.page,
    options.sortBy,
    options.perPage,
    filters.withOnlyTrashed,
    filters.search,
    filters.branchId,
  ]);

  // @ts-ignore
  const tableHeaders = [
    {
      text: "Vorname",
      value: "firstName",
    },
    {
      text: "Nachname",
      value: "lastName",
    },
    {
      text: "E-Mail",
      value: "email",
    },
    {
      text: "Neue Sparten",
      value: "branchUserMemberShips",
      transform: (item: any) =>
        item.branchUserMemberShips
          .map((branchUserMemberShip: iBranchUserMemberShip) => {
            return branchUserMemberShip.branch.name;
          })
          .join(", "),
    },
    {
      text: "Geburtstag",
      value: "birthday",
      transform: (item: any) => {
        return date(item.birthday);
      },
    },
    {
      text: "Aktionen",
      value: "actions",
      sortable: false,
      transform: (item: any) => (
        <ColumnRow>
          {item.branchUserMemberShips.map(
            (branchUserMemberShip: iBranchUserMemberShip) => (
              <AcceptNewBranchMembersButton
                key={item.id}
                user={item}
                branchUserMemberShip={branchUserMemberShip}
              />
            )
          )}
        </ColumnRow>
      ),
    },
  ];
  return (
    <Table
      headers={tableHeaders}
      data={members}
      keyValue="id"
      loading={loading}
      options={options}
      setOptions={setOptions}
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

export default NewBranchMembers;
