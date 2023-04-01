import React from 'react';
import Head from "next/head";
import tw from "twin.macro";

const Container = tw.div`
  
`;

const PermissionDenied = () => {
    return (
        <>
            <Head>
                <title>Keine Berechtigung | Alles im Rudel e.V.</title>
                <meta
                    name="description"
                    content="Alles im Rudel ist ein Verein in Elmshorn, der 2021 gegründet wurde und mehrere Sparten hat, wie z.B. Airsoft oder E-Sports"
                />
            </Head>
            <Container>
                403 - Error
                Keine Berechtigung
            </Container>
        </>
    );
};

export default PermissionDenied;
