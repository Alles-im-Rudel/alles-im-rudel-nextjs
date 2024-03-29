import React from 'react';
import tw from "twin.macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {TextLink} from "../Button";
import {faDiscord, faFacebook, faInstagram, faTwitch, faYoutube} from '@fortawesome/free-brands-svg-icons';

const Container = tw.div`
    w-full
    bg-greyBlue
`;

const Wrapper = tw.div`
    max-w-screen-xl
    flex
    flex-col
    md:flex-row
    text-text
    text-white
    text-center
    px-small
    py-smaller
    justify-between
    m-auto
    items-center
    gap-smaller
`;

const ItemWrapper = tw.div`
    flex
    gap-smaller
`;

const SocialFooter = () => {
    return (
        <Container>
            <Wrapper>
                Get connected with us on social networks!
                <ItemWrapper>
                    <TextLink href="https://www.discord.com/invite/sMzHHnFkTh/">
                        <FontAwesomeIcon icon={faDiscord} />
                    </TextLink>
                    <TextLink href="https://www.instagram.com/allesimrudel/">
                        <FontAwesomeIcon icon={faInstagram} />
                    </TextLink>
                    <TextLink href="https://www.facebook.com/allesimrudel/">
                        <FontAwesomeIcon icon={faFacebook} />
                    </TextLink>
                    <TextLink href="https://www.youtube.com/channel/UCPNIzEtVBgS5cu6ak_FkjDQ">
                        <FontAwesomeIcon icon={faYoutube} />
                    </TextLink>
                    <TextLink href="https://www.twitch.tv/allesimrudel/">
                        <FontAwesomeIcon icon={faTwitch} />
                    </TextLink>
                </ItemWrapper>
            </Wrapper>
        </Container>
    );
};

export default SocialFooter;
