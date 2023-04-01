import React from 'react';
import tw from "twin.macro";
import ImageWithLoader from "../../Layout/Image";
import iBoardOfDirecor from "../../../Interfaces/iBoardOfDirecor";
import {TextLink} from "../../Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInstagram, faLinkedin, faSnapchat} from '@fortawesome/free-brands-svg-icons';
import {age} from '../../../lib/dates';

const Card = tw.div`
    flex
    flex-col
    shadow-xl
    justify-between
`;

const ImageWrapper = tw.div`
   h-96
   w-fit
`;

const Image = tw(ImageWithLoader)`
   object-cover
   h-full
   w-full
`;

const TextWrapper = tw.div`
    flex
    flex-col
    gap-smaller
    items-center
    m-smaller
`;

const SocialWrapper = tw.div`
    flex
    gap-smaller
`;

const Name = tw.div`
    text-center
`;
const Age = tw.div`
    text-small
    text-center
`;

type BoardOfDirectorCardProps = {
    boardOfDirector: iBoardOfDirecor
}
const BoardOfDirectorCard = ({boardOfDirector}: BoardOfDirectorCardProps) => {
    return (
        <Card>
            <ImageWrapper>
                <Image
                    src={boardOfDirector.attributes.image.data.attributes.url}
                    alt="test"
                    width={360}
                    height={500}
                />
            </ImageWrapper>
            <TextWrapper>
                <Name>
                    {boardOfDirector.attributes.name}
                    <Age>{age(boardOfDirector.attributes.birthday)} Jahre alt</Age>
                </Name>
                <SocialWrapper>
                    <TextLink href={boardOfDirector.attributes.instagramLink}>
                        <FontAwesomeIcon icon={faInstagram} />
                    </TextLink>
                    <TextLink href={boardOfDirector.attributes.snapchatLink}>
                        <FontAwesomeIcon icon={faSnapchat} />
                    </TextLink>
                    <TextLink href={boardOfDirector.attributes.linkedinLink}>
                        <FontAwesomeIcon icon={faLinkedin} />
                    </TextLink>
                </SocialWrapper>
            </TextWrapper>
        </Card>
    );
};

export default BoardOfDirectorCard;
