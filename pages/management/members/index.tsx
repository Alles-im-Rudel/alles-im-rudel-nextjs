import React from "react";
import Head from "next/head";
import tw from "twin.macro";
import Tabs from "../../../components/Elements/Tabs";
import NewMembers from "../../../components/Members/NewMembers/NewMembers";
import NewBranchMembers from "../../../components/Members/NewBranchMembers/NewBranchMembers";
import SepaData from "../../../components/Members/SepaData/SepaData";

const Container = tw.div`
    pt-small
    mb-base
    mx-small
`;

const Members = () => {
  return (
    <>
      <Head>
        <title>Mitgliederverwaltung | Alles im Rudel e.V.</title>
        <meta
          name="description"
          content="Alles im Rudel ist ein Verein in Elmshorn, der 2021 gegründet wurde und mehrere Sparten hat, wie z.B. Airsoft oder E-Sports"
        />
      </Head>
      <Container>
        <Tabs
          tabs={[
            {
              value: "new-members",
              title: "Neue Anmeldungen",
              content: <NewMembers />,
            },
            {
              value: "new-branch-members",
              title: "Neue Spartenanträge",
              content: <NewBranchMembers />,
            },
            {
              value: "sepa-members",
              title: "SEPA-Daten",
              content: <SepaData />,
            },
          ]}
        />
      </Container>
    </>
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

export default Members;
