import React, { useEffect, useState } from "react";
import Head from "next/head";
import tw from "twin.macro";
import Headline from "../components/Layout/Headline";
import useProfilStore from "../lib/Profil/store";
import { shallow } from "zustand/shallow";
import iUser from "../Interfaces/iUser";
import ProfileImg from "../components/Elements/User/Profile/ProfileImg";
import ProfileForm from "../components/Elements/User/Profile/ProfileForm";
import styled from "@emotion/styled";
import ProfileBranches from "../components/Elements/User/Profile/ProfileBranch/ProfileBranches";
import branch from "../components/Elements/Branch/Branch";

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

const ProfileWrapper = styled.div`
  ${tw`
    mt-small
    gap-small
    flex
    flex-col
  `};
  @container container (min-width: 700px) {
    flex-direction: row;
  }
`;

const InfoCard = styled.div`
  ${tw`
    rounded-md
    mt-small
    p-smaller
    text-small
    bg-liked
    text-white
    border-t-8
    border-t-likedInfo
    border-solid
  `};

  a {
    font-weight: bold;
  }
`;

const Profile = () => {
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
      <Container>
        <Headline headline={4}>Dein Profil</Headline>
        {user && (
          <>
            <ProfileWrapper>
              <ProfileImg user={user} />
              <ProfileForm user={user} />
            </ProfileWrapper>
          </>
        )}
        <InfoCard>
          Falls du anderweitige Profilanpassungswünsche hast, melde dich bitte
          per Mail bei uns unter{" "}
          <a href="mailto:allesimrudel@gmail.com">allesimrudel@gmail.com</a>.
        </InfoCard>
        <Headline css={tw`my-smaller`} headline={5}>
          Deine Sparten
        </Headline>
        {user && <ProfileBranches user={user} onReload={loadUser} />}
      </Container>
    </>
  );
};

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default Profile;
