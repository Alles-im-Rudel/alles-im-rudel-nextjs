import React from "react";
import tw from "twin.macro";
import Text from "../Layout/Text";
import ImageWithLoader from "../Layout/Image";
import iMedia from "../../Interfaces/iMedia";
import { age } from "../../lib/dates";

const Card = tw.div`
    sticky
    top-32
    w-[270px]
    min-h-[500px]
    flex
    flex-col
    bg-white
    shadow
`;

const Image = tw(ImageWithLoader)`
   object-cover
   h-full
   w-full
`;

const TextWrapper = tw.div`
    flex
    flex-col
    justify-center
    items-center
`;

type iLeaderCard = {
  leader: {
    name: string;
    description: string;
    image: iMedia;
    birthday: string;
  };
};
const LeaderCard = ({ leader }: iLeaderCard) => {
  return (
    <Card>
      <Image
        src={leader.image.url}
        alt={leader.image.alt}
        width={270}
        height={400}
      />
      <TextWrapper>
        <Text>{leader.name}</Text>
        <Text>{age(leader.birthday)}</Text>
        <Text>{leader.description}</Text>
      </TextWrapper>
    </Card>
  );
};

export default LeaderCard;
