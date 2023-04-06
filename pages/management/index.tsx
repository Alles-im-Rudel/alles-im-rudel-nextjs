import React, {useEffect, useMemo} from 'react';
import Head from "next/head";
import tw from "twin.macro";
import Table from '../../components/Layout/Table/Table';
import useUserStore from "../../lib/Management/User/store";
import useAuthStore from "../../lib/Auth/store";
import {shallow} from "zustand/shallow";
import {dateTime} from "../../lib/dates";
import {faCheck, faMagnifyingGlass, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {TextButton} from "../../components/Button";
import {useRouter} from "next/router";

const Container = tw.div`
    pt-small
    mb-base
    mx-small
`;

const Management = () => {
    const router = useRouter();

    const [
        can,
    ] = useAuthStore((state) => [
        state.can,
    ], shallow);


};

export async function getStaticProps() {
    return {
        props: {
            protected: true,
            permission: "headline.management",
        },
    }
}

export default Management;
