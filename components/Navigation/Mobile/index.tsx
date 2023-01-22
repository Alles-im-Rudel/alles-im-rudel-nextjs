import React, {useEffect} from 'react';
import tw from "twin.macro";
import styled from "@emotion/styled";
import _link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightToBracket} from "@fortawesome/free-solid-svg-icons";

type iMobileNavigation = {
    isActive: boolean
}
const MobileNavigation = styled.div<iMobileNavigation>`
  ${({isActive}) => isActive ? tw`fixed` : tw`hidden`}
  z-index: 200
  ${tw`
    top-0
    left-0
    w-full
    h-full
    bg-white
  `}
`;

const LinkWrapper = tw.div`
    h-full
    w-full
    flex
    justify-center
    items-center
    flex-col
`;

interface iLink {
    css?: unknown;
}

const Link = styled(_link)<iLink>`
    ${tw`text-h-2`}
`;

type iMobile = {
    isActive: boolean
}
const Mobile = ({isActive}: iMobile) => {

    useEffect(() => {
        if (typeof document !== "undefined") {
            const body = document.body;
            if (body) {
                if (isActive) {
                    body.style.overflow = "hidden";
                } else {
                    body.style.overflow = "unset";
                }
                return () => {
                    body.style.overflow = "unset";
                }
            }
        }
    }, [isActive])

    return (
        <MobileNavigation isActive={isActive}>
            <LinkWrapper>
                <Link href="https://www.teamstolz.de/vereinsshop/alles-im-rudel/">
                    Shop
                </Link>
                <Link key="/branches/airsoft" href="/branches/airsoft">
                    Airsoft
                </Link>
                <Link key="/branches/esports" href="/branches/e-sports">
                    E-Sports
                </Link>
                <Link href="/join">
                    Beitritt
                </Link>
                <Link href="/login" css={tw`text-h-4`}>
                    <FontAwesomeIcon icon={faRightToBracket} />
                </Link>
            </LinkWrapper>
        </MobileNavigation>
    );
};

export default Mobile;
