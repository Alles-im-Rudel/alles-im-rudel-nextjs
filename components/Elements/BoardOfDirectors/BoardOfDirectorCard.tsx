import React from "react";
import tw from "twin.macro";
import ImageWithLoader from "../../Layout/Image";
import IBoardMember from "../../../Interfaces/iBoardMember";
import { TextLink } from "../../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedin,
  faSnapchat,
} from "@fortawesome/free-brands-svg-icons";
import { age } from "../../../lib/dates";

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
  boardOfDirector: IBoardMember;
};
const BoardOfDirectorCard = ({ boardOfDirector }: BoardOfDirectorCardProps) => {
  return (
    <Card>
      <ImageWrapper>
        {typeof boardOfDirector.image !== "string" &&
          boardOfDirector.image.url && (
            <Image
              src={boardOfDirector.image.url}
              alt="test"
              width={360}
              height={500}
            />
          )}
      </ImageWrapper>
      <TextWrapper>
        <Name>
          {boardOfDirector.name}
          {boardOfDirector.birthday && (
            <Age>{age(boardOfDirector.birthday)} Jahre alt</Age>
          )}
        </Name>
        <SocialWrapper>
          <TextLink href={boardOfDirector.instagramLink}>
            <FontAwesomeIcon icon={faInstagram} />
          </TextLink>
          <TextLink href={boardOfDirector.snapchatLink}>
            <FontAwesomeIcon icon={faSnapchat} />
          </TextLink>
          <TextLink href={boardOfDirector.linkedinLink}>
            <FontAwesomeIcon icon={faLinkedin} />
          </TextLink>
        </SocialWrapper>
      </TextWrapper>
    </Card>
  );
};

export default BoardOfDirectorCard;
