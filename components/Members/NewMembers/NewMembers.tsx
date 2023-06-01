import React, { useEffect } from "react";
import tw from "twin.macro";
import Table from "../../../components/Layout/Table/Table";
import useMembersStore from "../../../lib/Management/Members/store";
import { shallow } from "zustand/shallow";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ColumnRow from "../../../components/Layout/Table/ColumnRow";
import { date } from "../../../lib/dates";
import MemberShowButton from "./MemberAccept/MemberShowButton";

const NewMembers = () => {
  const [loading, options, filters, members, getMembers, setOptions] =
    useMembersStore(
      (state) => [
        state.loading,
        state.options,
        state.filters,
        state.members,
        state.getMembers,
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
      text: "E-Mail bestätigt",
      value: "emailVerifiedAt",
      transform: (item: any) =>
        item.emailVerifiedAt ? (
          /* @ts-ignore */
          <FontAwesomeIcon css={tw`text-success`} icon={faCheck} />
        ) : (
          /* @ts-ignore */
          <FontAwesomeIcon css={tw`text-error`} icon={faXmark} />
        ),
    },
    {
      text: "Geburtstag",
      value: "birthday",
      transform: (item: any) => date(item.birthday),
    },
    {
      text: "Aktionen",
      value: "actions",
      sortable: false,
      transform: (item: any) => (
        <ColumnRow>
          <MemberShowButton member={item} />
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

export default NewMembers;
