import React, { useEffect } from "react";
import Head from "next/head";
import tw from "twin.macro";
import Table from "../../../components/Layout/Table/Table";
import usePermissionStore from "../../../lib/Management/Permission/store";
import { shallow } from "zustand/shallow";
import { dateTime } from "../../../lib/dates";
import SyncPermissionsButton from "../../../components/Elements/UserGroup/SyncPermissions/SyncPermissionsButton";
import ColumnRow from "../../../components/Layout/Table/ColumnRow";

const Container = tw.div`
    pt-small
    mb-base
    mx-small
`;

const Permissions = () => {
  const [loading, options, userGroups, getUserGroups, setOptions] =
    usePermissionStore(
      (state) => [
        state.loading,
        state.options,
        state.userGroups,
        state.getUserGroups,
        state.setOptions,
      ],
      shallow
    );

  useEffect(() => {
    if (!loading) {
      getUserGroups();
    }
  }, [options.page, options.sortBy, options.perPage]);

  // @ts-ignore
  const tableHeaders = [
    {
      text: "Name",
      value: "displayName",
    },
    {
      text: "Benutzer",
      value: "usersCount",
    },
    {
      text: "Level",
      value: "levelId",
    },
    {
      text: "Berechtigungen",
      value: "permissionsCount",
    },
    {
      text: "Bearbeitet am",
      value: "updatedAt",
      transform: (item: any) => dateTime(item.updatedAt),
    },
    {
      text: "Aktionen",
      value: "actions",
      sortable: false,
      transform: (item: any) => (
        <ColumnRow>
          <SyncPermissionsButton userGroupId={item.id} />
        </ColumnRow>
      ),
    },
  ];
  return (
    <>
      <Head>
        <title>Berechtigungsverwaltung | Alles im Rudel e.V.</title>
        <meta
          name="description"
          content="Alles im Rudel ist ein Verein in Elmshorn, der 2021 gegründet wurde und mehrere Sparten hat, wie z.B. Airsoft oder E-Sports"
        />
      </Head>
      <Container>
        <Table
          headers={tableHeaders}
          headline="Berechtigungsverwaltung"
          data={userGroups}
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
      permission: "permissions.index",
    },
  };
}

export default Permissions;
