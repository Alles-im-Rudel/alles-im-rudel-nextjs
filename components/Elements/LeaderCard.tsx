import React from 'react';
import tw from "twin.macro";
import iLeader from "../../Interfaces/iLeader";
import Text from "../Layout/Text"
import ImageWithLoader from "../Layout/Image";

const Card = tw.div`
    sticky
    top-32
    w-[270px]
    h-[500px]
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
    leader: iLeader
}
const LeaderCard = ({leader}: iLeaderCard) => {

    return (
        <Card>
            <Image
                src={leader.image.data.attributes.url}
                alt="Logo Alles im Rudel e.V."
                width={270}
                height={400}
            />
            <TextWrapper>
                <Text>{leader.name}</Text>
                <Text>{leader.birthday}</Text>
                <Text>{leader.description}</Text>
            </TextWrapper>
        </Card>
    );
};

export default LeaderCard;
