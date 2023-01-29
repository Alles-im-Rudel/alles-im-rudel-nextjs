import React from 'react';
import iLoLTeamMember from "../../Interfaces/iLoLTeamMember";
import tw from "twin.macro";
import ImageWithLoader from "../Layout/Image";


const Card = tw.div`
  h-[340px]
  w-fit
  relative
  overflow-hidden
`;

const Image = tw(ImageWithLoader)`
   object-cover
   h-full
   w-full
`;

const LaneImage = tw(ImageWithLoader)`
   group-hover:-translate-y-[80px]
   transition-all
   object-cover
   w-[50px]
   h-[50px]
   mx-auto
`;

const Text = tw.p`
    absolute
    bottom-0
    text-center
    w-full
`;

interface iLolMember {
    member: iLoLTeamMember
}

const LoLMember = ({member}: iLolMember) => {
    return (
        <Card className="group">
            <Image
                src={member.image.data.attributes.url}
                alt={member.image.data.attributes.alternativeText}
                width={192}
                height={340}
            />
            <LaneImage
                src={member.lolLane.data.attributes.image.data.attributes.url}
                alt={member.lolLane.data.attributes.image.data.attributes.alternativeText}
                width={50}
                height={50}
            />
            <Text>
                {member.name}
            </Text>
        </Card>
    );
};

export default LoLMember;
