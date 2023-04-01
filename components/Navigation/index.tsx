import React, {useEffect, useState} from 'react';
import tw from 'twin.macro';
import _image from 'next/image'
import _link from 'next/link';
import {TextButton, TextLink} from '../Button';
import {Link} from '../Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faAward,
    faCodeBranch,
    faCartShopping,
    faRightToBracket,
    faGear,
    faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';
import DropdownButton from "../DropdownButton";
import Mobile from './Mobile';
import AnimatedBurgerIcon from "../Layout/AnimatedBurgerIcon";
import {useAuth} from "../../hooks/useAuth";

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
    const {can, isAuth, logout} = useAuth();

    useEffect(() => setShowAuth(isAuth), [isAuth])

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
                    <DropdownButton
                        items={[
                            <TextLink black key="/branches/airsoft" href="/branches/airsoft">
                                Airsoft
                            </TextLink>,
                            <TextLink black key="/branches/esports" href="/branches/e-sports">
                                E-Sports
                            </TextLink>
                        ]}>
                        <><FontAwesomeIcon icon={faCodeBranch} /> Sparten</>
                    </DropdownButton>
                    <Link href="/join">
                        <FontAwesomeIcon icon={faAward} /> Beitritt
                    </Link>
                    <VerticalLine />
                    {!showAuth ? <Link href="/login">
                            <FontAwesomeIcon icon={faRightToBracket} />
                        </Link> :
                        <DropdownButton
                            items={[
                                <TextLink black key="/management" href="/management">
                                    Benutzerverwaltung
                                </TextLink>,
                                <TextButton black onClick={logout} key="logut">
                                    <FontAwesomeIcon icon={faRightFromBracket} />
                                </TextButton>
                            ]}>
                            <FontAwesomeIcon icon={faGear} />
                        </DropdownButton>
                    }
                </LinkWrapper>
                <AnimatedBurgerIcon handleClick={() => setIsActive(!isActive)} isActive={isActive} />
            </NavigationContainer>
            <Mobile isActive={isActive} setIsActive={setIsActive} />
        </>
    );
};

export default Navigation;
