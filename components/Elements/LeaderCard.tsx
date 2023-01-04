import React from 'react';
import tw from "twin.macro";

const Card = tw.div`
    sticky
    top-32
    w-[270px]
    h-[400px]
    flex
    flex-col
    bg-white
`;

type iLeaderCard = {
    leader: any
}
const LeaderCard = ({leader}: iLeaderCard) => {
    console.log(leader)
    return (
        <Card>
            {leader.name}
            {leader.birthday}
            {leader.birthday}
        </Card>
    );
};

export default LeaderCard;
