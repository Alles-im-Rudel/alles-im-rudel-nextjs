import React, {useState} from 'react';
import tw from 'twin.macro';
import Image from 'next/image'
import _link from 'next/link';
import {TextLink} from '../Button';
import {Link} from '../Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAward, faCodeBranch, faCartShopping, faRightToBracket} from '@fortawesome/free-solid-svg-icons';
import DropdownButton from "../DropdownButton";
import Mobile from './Mobile';
import AnimatedBurgerIcon from "../Layout/AnimatedBurgerIcon";

const NavigationContainer = tw.div`
    z-50
    fixed
    top-0
    left-0
    w-full
    p-4
    bg-primary
    text-white
    flex
    justify-between
    items-center
    drop-shadow
`;

const StyledLink = tw(_link)`
    flex
    content-start
    items-center
    gap-3
`;

const LinkWrapper = tw.div`
    hidden
    content-end
    items-center
    gap-3
    md:flex
`;

const VerticalLine = tw.div`
    border-l-2
    border-white
    brightness-50
    h-full
`;

const Navigation = () => {
    const [isActive, setIsActive] = useState(false);
    return (
        <>
            <NavigationContainer>
                <StyledLink href="/">
                    <Image
                        src="/logos/logo-white-slim.png"
                        alt="Logo Alles im Rudel e.V."
                        width={64}
                        height={35}
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
                    <Link href={`${process.env.NEXT_PUBLIC_ADMIN_URL}/login`}>
                        <FontAwesomeIcon icon={faRightToBracket} />
                    </Link>
                </LinkWrapper>
                <AnimatedBurgerIcon handleClick={() => setIsActive(!isActive)} isActive={isActive} />
            </NavigationContainer>
            <Mobile isActive={isActive} setIsActive={setIsActive}/>
        </>
    );
};

export default Navigation;
