import React from 'react';
import iAirsoftTeam from "../../Interfaces/iAirsoftTeam";
import tw from "twin.macro";
import _image from "next/image";
import Text from "../Layout/Text";
import Badge from './Badge';
import { TextLink } from '../Button';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faLink } from '@fortawesome/free-solid-svg-icons';

const Card = tw.div`
    relative
    h-[340px]
    w-fit
    overflow-hidden
`;

const ImageWrapper = tw.div`
   w-fit
   h-full
`;

const Image = tw(_image)`
   object-cover
   h-full
   w-full
`;

const TopWrapper = tw.div`
  absolute
  top-[-100%]
  w-full
  text-white
  flex
  flex-col
  justify-center
  items-center
  group-hover:top-0
  transition-all
`;

const BadgeWrapper = tw.div`
    relative
    flex
    m-3
    gap-2
    w-full
    justify-center
`;

const TextWrapper = tw.div`
    absolute
    bottom-[-35px]
    w-full
    text-white
    flex
    flex-col
    justify-center
    items-center
    group-hover:bottom-[0]
    transition-all
`;

const CallName = tw(Text)`
    
`;

const Name = tw(Text)`
    
`;

const Position = tw(Text)`
    
`;

type iMember = {
    member: iAirsoftTeam
}
const Member = ({member}: iMember) => {
    return (
        <Card className="group">
            <TopWrapper>
                <BadgeWrapper>
                    {member.playerBadges.data.length > 0 && member.playerBadges.data.map(item => <Badge key={item.id} badge={item} />)}
                </BadgeWrapper>
                {member.joinedAt}
            </TopWrapper>
            <ImageWrapper>
                <Image
                    src={process.env.NEXT_PUBLIC_CONTENT_URL + member.image.data.attributes.url}
                    alt="test"
                    width={400}
                    height={400}
                />
            </ImageWrapper>
            <TextWrapper>
                <CallName>
                    {member.callName}
                </CallName>
                <Name>
                    {member.name}
                </Name>
                <Position>
                    {member.position}
                </Position>
                <TextLink href={member.link}>
                    <FontAwesomeIcon icon={faLink} />
                </TextLink>
            </TextWrapper>
        </Card>
    );
};

export default Member;
