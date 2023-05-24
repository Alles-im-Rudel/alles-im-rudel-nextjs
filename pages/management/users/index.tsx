import React, { useEffect } from "react";
import Head from "next/head";
import tw from "twin.macro";
import Table from "../../../components/Layout/Table/Table";
import useUserStore from "../../../lib/Management/User/store";
import { shallow } from "zustand/shallow";
import { dateTime } from "../../../lib/dates";
import { faCheck, faUserPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button, { TextLink } from "../../../components/Button";
import ColumnRow from "../../../components/Layout/Table/ColumnRow";
import Search from "../../../components/Form/Search";
import BranchSelect from "../../../components/Elements/Branch/BranchSelect";
import { Color } from "../../../components/Button/BackgroundColor";
import ShowUserButton from "../../../components/Elements/User/ShowUser/ShowUserButton";
import SyncUserGroupsButton from "../../../components/Elements/User/SyncUserGroups/SyncUserGroupsButton";
import SyncPermissionsButton from "../../../components/Elements/User/SyncPermissions/SyncPermissionsButton";

const Container = tw.div`
    pt-small
    mb-base
    mx-small
`;

const Users = () => {
  const [loading, options, filters, users, getUsers, setOptions, setFilters] =
    useUserStore(
      (state) => [
        state.loading,
        state.options,
        state.filters,
        state.users,
        state.getUsers,
        state.setOptions,
        state.setFilters,
      ],
      shallow
    );

  useEffect(() => {
    if (!loading) {
      getUsers();
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
      text: "Benutzergruppen",
      value: "userGroupsCount",
    },
    {
      text: "Sparten",
      value: "branchUserMemberShipsCount",
    },
    {
      text: "Aktiv",
      value: "activatedAt",

      transform: (item: any) =>
        item.activatedAt ? (
          /* @ts-ignore */
          <FontAwesomeIcon css={tw`text-success`} icon={faCheck} />
        ) : (
          /* @ts-ignore */
          <FontAwesomeIcon css={tw`text-error`} icon={faXmark} />
        ),
    },
    {
      text: "Bearbeitet am",
      value: "updatedAt",
      transform: (item: any) => dateTime(item.updatedAt),
    },
    {
      text: "Erstellt am",
      value: "createdAt",
      transform: (item: any) => dateTime(item.createdAt),
    },
    {
      text: "Aktionen",
      value: "actions",
      sortable: false,
      transform: (item: any) => (
        <ColumnRow>
          <ShowUserButton userId={item.id} />
          <TextLink href={"/management/users/edit/" + item.id}>
            <FontAwesomeIcon icon={faUserPen} />
          </TextLink>
          <SyncUserGroupsButton userId={item.id} />
          <SyncPermissionsButton userId={item.id} />
        </ColumnRow>
      ),
    },
  ];
  return (
    <>
      <Head>
        <title>Benutzerverwaltung | Alles im Rudel e.V.</title>
        <meta
          name="description"
          content="Alles im Rudel ist ein Verein in Elmshorn, der 2021 gegründet wurde und mehrere Sparten hat, wie z.B. Airsoft oder E-Sports"
        />
      </Head>
      <Container>
        <Table
          headers={tableHeaders}
          isServerSide={true}
          headline={
            <>
              Benutzerverwaltung
              <Search submit={(data) => setFilters("search", data.search)} />
              <BranchSelect
                selectedBranch={filters.branchId}
                setBranch={(branchId) => setFilters("branchId", branchId)}
              />
              <Button
                color={Color.success}
                onClick={() => console.log("Download")}
              >
                Excel Download
              </Button>
            </>
          }
          data={users}
          keyValue="id"
          loading={loading}
          options={options}
          setOptions={setOptions}
        />
      </Container>
    </>
  );
};

export async function getStaticProps() {
  return {
    props: {
      protected: true,
      permission: "users.index",
    },
  };
}

export default Users;
