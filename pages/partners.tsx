import React, { useEffect, useState } from "react";
import Head from "next/head";
import tw from "twin.macro";
import useProfilStore from "../lib/Profil/store";
import { shallow } from "zustand/shallow";
import iUser from "../Interfaces/iUser";
import styled from "@emotion/styled";
import { apiFetch } from "../lib/api";
import iPartner from "../Interfaces/iPartner";
import Divider from "../components/Elements/Divider";
import Headline from "../components/Layout/Headline";
import { css } from "@emotion/react";
import PartnerCard from "../components/Partner/PartnerCard";

const Container = styled.div`
  container-type: inline-size;
  container-name: container;
  ${tw`
       max-w-screen-xl
       pt-small
       mb-base
       mx-auto
       px-small
  `}
`;

const CardWrapper = tw.div`
  mt-small
  flex
  flex-col
  gap-smaller
`;

interface PartnersProps {
  partners: iPartner[];
}
const Partners = ({ partners }: PartnersProps) => {
  const [loading, getUser] = useProfilStore(
    (state) => [state.loading, state.getUser],
    shallow
  );

  const [user, setUser] = useState<iUser | null>(null);

  const loadUser = async () => {
    const userResponse = await getUser();
    setUser(userResponse);
  };

  useEffect(() => {
    if (!loading) {
      loadUser();
    }
  }, []);

  return (
    <>
      <Head>
        <title>Dein Profil | Alles im Rudel e.V.</title>
        <meta
          name="description"
          content="Alles im Rudel ist ein Verein in Elmshorn, der 2021 gegründet wurde und mehrere Sparten hat, wie z.B. Airsoft oder E-Sports"
        />
      </Head>
      <Divider>Sponsoring</Divider>
      <Container>
        <Headline
          headline={6}
          css={css`
            ${tw`font-bold mb-smaller`}
          `}
        >
          Hier siehst du alle Sponsoren unseres Vereins.
        </Headline>
        <p
          // @ts-ignore
          css={css`
            ${tw`text-base`}
          `}
        >
          Während auf manche Sponsorings alle Vereinsmitglieder Zugriff haben,
          gibt es auch Sponsorings auf die lediglich die Mitglieder bestimmter
          Sparten Zugriff haben. Um Zugriff auf diese zu erhalten, tritt einfach
          der entsprechenden Sparte bei!
        </p>
        {user && (
          <CardWrapper>
            {partners.map((partner) => (
              <PartnerCard key={partner.id} partner={partner} user={user} />
            ))}
          </CardWrapper>
        )}
      </Container>
    </>
  );
};

export async function getStaticProps() {
  const res = await apiFetch(`/partners/?populate=logo,smallLogo,branches`);
  const partners = await res.data;
  return {
    props: {
      protected: true,
      partners: partners,
    },
  };
}

export default Partners;
