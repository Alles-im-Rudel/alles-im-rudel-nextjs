import React from 'react';
import tw from 'twin.macro';
import Image from 'next/image'
import _link from 'next/link';
import {TextLink} from '../Button';
import {Link} from '../Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAward, faCodeBranch, faCartShopping, faRightToBracket} from '@fortawesome/free-solid-svg-icons';
import DropdownButton from "../DropdownButton";

const NavigationContainer = tw.div`
    z-10
    fixed
    top-0
    left-0
    w-full
    p-4
    bg-primary
    text-white
    flex
    justify-between
    drop-shadow
`;

const StyledLink = tw(_link)`
    flex
    content-start
    items-center
    gap-3
`;

const LinkWrapper = tw.div`
    flex
    content-end
    items-center
    gap-3
`;

const VerticalLine = tw.div`
    border-l-2
    border-white
    brightness-50
    h-full
`;

const Navigation = () => {
    return (
        <NavigationContainer>
            <StyledLink href="/">
                <Image
                    src="/logos/logo-white-slim.png"
                    alt="Logo Alles im Rudel e.V."
                    width={64}
                    height={64}
                />
                Alles im Rudel e.V.
            </StyledLink>
            <LinkWrapper>
                <Link href="https://www.teamstolz.de/vereinsshop/alles-im-rudel/">
                    <FontAwesomeIcon icon={faCartShopping} /> Shop
                </Link>
                <DropdownButton
                    items={[
                        <TextLink black key="/branches/airsoft" href="/branches/airsoft">
                            Airsoft
                        </TextLink>,
                        <TextLink black key="/branches/esports" href="/branches/esports">
                            E-Sports
                        </TextLink>
                    ]}>
                    <><FontAwesomeIcon icon={faCodeBranch} /> Sparten</>
                </DropdownButton>
                <Link href="/join">
                    <FontAwesomeIcon icon={faAward} /> Beitritt
                </Link>
                <VerticalLine />
                <Link href="/login">
                    <FontAwesomeIcon icon={faRightToBracket} />
                </Link>
            </LinkWrapper>
        </NavigationContainer>
    );
};

export default Navigation;
