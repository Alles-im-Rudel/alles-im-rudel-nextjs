import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import _image from "next/image";
import _link from "next/link";
import { TextButton, TextLink } from "../Button";
import { Link } from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAward,
  faCodeBranch,
  faCartShopping,
  faRightToBracket,
  faGear,
  faRightFromBracket,
  faUsers,
  faGem,
  faUser,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";
import DropdownButton from "../DropdownButton";
import Mobile from "./Mobile";
import AnimatedBurgerIcon from "../Layout/AnimatedBurgerIcon";
import useAuthStore from "../../lib/Auth/store";
import { shallow } from "zustand/shallow";

const NavigationContainer = tw.div`
    z-50
    fixed
    top-0
    left-0
    w-full
    p-smaller
    bg-primary
    text-white
    flex
    justify-between
    items-center
    drop-shadow
`;

const Image = tw(_image)`
    w-20
    h-fit
`;

const StyledLink = tw(_link)`
    flex
    content-start
    items-center
    gap-smaller
    text-text
`;

const LinkWrapper = tw.div`
    hidden
    content-end
    items-center
    gap-smaller
    md:flex
`;

const VerticalLine = tw.div`
    border-l-2
    border-white
    brightness-50
    h-full
    min-h-[2rem]
`;

const Navigation = () => {
  const [isActive, setIsActive] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const [can, isAuth, logout] = useAuthStore(
    (state) => [state.can, state.isAuth, state.logout],
    shallow
  );

  useEffect(() => {
    setShowAuth(isAuth);
  }, [isAuth]);

  const authItems = [
    <TextLink black href="/profile" key="profile">
      <FontAwesomeIcon icon={faUserGear} /> Profil
    </TextLink>,
    <TextLink black href="/partners" key="partners">
      <FontAwesomeIcon icon={faGem} /> Sponsoring
    </TextLink>,
    <TextButton black onClick={() => logout()} key="logut">
      <FontAwesomeIcon icon={faRightFromBracket} /> Abmelden
    </TextButton>,
  ];

  const managementItems = [];
  if (can("members.manage")) {
    managementItems.unshift(
      <TextLink
        black
        key="/management/members"
        href="/management/members?tab=new-members"
      >
        Neue Mitglieder
      </TextLink>
    );
  }
  if (can("permissions.index")) {
    managementItems.unshift(
      <TextLink
        black
        key="/management/permissions"
        href="/management/permissions"
      >
        Berechtigungen
      </TextLink>
    );
  }
  if (can("users.index")) {
    managementItems.unshift(
      <TextLink black key="/management/users" href="/management/users">
        Benutzerverwaltung
      </TextLink>
    );
  }

  const branchItems = [
    <TextLink black key="/branches/airsoft" href="/branches/airsoft">
      Airsoft
    </TextLink>,
    <TextLink black key="/branches/esports" href="/branches/e-sports">
      E-Sports
    </TextLink>,
  ];

  return (
    <>
      <NavigationContainer>
        <StyledLink href="/">
          <Image
            src="/logos/logo-white-slim.png"
            alt="Logo Alles im Rudel e.V."
            width={96}
            height={53}
          />
          Alles im Rudel e.V.
        </StyledLink>
        <LinkWrapper>
          <Link href="https://www.teamstolz.de/vereinsshop/alles-im-rudel/">
            <FontAwesomeIcon icon={faCartShopping} /> Shop
          </Link>
          <DropdownButton items={branchItems}>
            <>
              <FontAwesomeIcon icon={faCodeBranch} /> Sparten
            </>
          </DropdownButton>
          <Link href="/join">
            <FontAwesomeIcon icon={faAward} /> Beitritt
          </Link>
          <VerticalLine />
          {!showAuth && (
            <Link href="/login">
              <FontAwesomeIcon icon={faRightToBracket} />
            </Link>
          )}
          {showAuth && (
            <DropdownButton items={authItems}>
              <FontAwesomeIcon icon={faUser} />
            </DropdownButton>
          )}
          {showAuth && can("headline.management") && (
            <DropdownButton items={managementItems}>
              <FontAwesomeIcon icon={faGear} />
            </DropdownButton>
          )}
        </LinkWrapper>
        <AnimatedBurgerIcon
          handleClick={() => setIsActive(!isActive)}
          isActive={isActive}
        />
      </NavigationContainer>
      <Mobile isActive={isActive} setIsActive={setIsActive} />
    </>
  );
};

export default Navigation;
