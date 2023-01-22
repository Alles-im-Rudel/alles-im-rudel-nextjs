import React from 'react';
import tw from "twin.macro";
import ImageWithLoader from "../../Layout/Image";
import iBoardOfDirecor from "../../../Interfaces/iBoardOfDirecor";
import {TextLink} from "../../Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInstagram, faLinkedin, faSnapchat} from '@fortawesome/free-brands-svg-icons';

const Card = tw.div`
    flex
    flex-col
    gap-3
`;

const ImageWrapper = tw.div`
   h-[500px]
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
    gap-3
    items-center
`;

const SocialWrapper = tw.div`
    flex
    gap-2
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
                <Name>{boardOfDirector.attributes.name}</Name>
                <Age>{boardOfDirector.attributes.birthday}</Age>
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
