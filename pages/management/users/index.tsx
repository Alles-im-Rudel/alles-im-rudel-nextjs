import React, {useEffect, useMemo} from 'react';
import Head from "next/head";
import tw from "twin.macro";
import Table from '../../../components/Layout/Table/Table';
import useUserStore from "../../../lib/Management/User/store";
import useAuthStore from "../../../lib/Auth/store";
import {shallow} from "zustand/shallow";
import {dateTime} from "../../../lib/dates";
import {faCheck, faMagnifyingGlass, faUserPen, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {TextButton, TextLink} from "../../../components/Button";
import {useRouter} from "next/router";
import ColumnRow from "../../../components/Layout/Table/ColumnRow";

const Container = tw.div`
    pt-small
    mb-base
    mx-small
`;

const Users = () => {
    const router = useRouter();

    const [
        can,
    ] = useAuthStore((state) => [
        state.can,
    ], shallow);

    const [
        loading,
        options,
        filters,
        users,
        getUsers,
        setOptions,
        setFilters,
    ] = useUserStore((state) => [
        state.loading,
        state.options,
        state.filters,
        state.users,
        state.getUsers,
        state.setOptions,
        state.setFilters
    ], shallow);

    useEffect(() => {
        if (!loading) {
            getUsers();
        }
    }, [options.page, options.sortBy, options.perPage, filters.withOnlyTrashed, filters.search, filters.branchId]);

    const tableHeaders = [
        {
            text: 'Vorname',
            value: 'firstName'
        },
        {
            text: 'Nachname',
            value: 'lastName'
        },
        {
            text: 'E-Mail',
            value: 'email'
        },
        {
            text: 'Benutzergruppen',
            value: 'userGroupsCount'
        },
        {
            text: 'Sparten',
            value: 'branchUserMemberShipsCount'
        },
        {
            text: 'Aktiv',
            value: 'activatedAt',
            /* @ts-ignore*/
            transform: (item: any) => item.activatedAt ? <FontAwesomeIcon css={tw`text-success`} icon={faCheck} /> :
                /* @ts-ignore*/
                <FontAwesomeIcon css={tw`text-error`} icon={faXmark} />
        },
        {
            text: 'Bearbeitet am',
            value: 'updatedAt',
            transform: (item: any) => dateTime(item.updatedAt)
        },
        {
            text: 'Erstellt am',
            value: 'createdAt',
            transform: (item: any) => dateTime(item.createdAt)
        },
        {
            text: 'Aktionen',
            value: 'actions',
            sortable: false,
            transform: (item: any) =>
                <ColumnRow>
                    <TextButton onClick={() => console.log("test")}><FontAwesomeIcon
                        icon={faMagnifyingGlass} /></TextButton>
                    <TextLink href={"/management/users/edit/" + item.id}><FontAwesomeIcon
                        icon={faUserPen} /></TextLink>
                </ColumnRow>
        }
    ]
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
                    data={users}
                    keyValue="id"
                    loading={loading}
                    options={options}
                    filters={filters}
                    setOptions={setOptions}
                    setFilters={setFilters}
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
    }
}

export default Users;
