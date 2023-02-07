import React from 'react';
import tw from 'twin.macro';
import iLolTeam from "../../Interfaces/iLoLTeam";
import Headline from '../Layout/Headline';
import LoLMember from "./LoLMember";
import Markdown from "../Layout/Markdown";

const Container = tw.div`
`;

const ListWrapper = tw.div`
    flex
    gap-4
    mb-4    
`;

const LeaugeHeadline = tw(Headline)`
    -mt-2
    mb-6
`;

interface iLolTeamComponent {
    team: iLolTeam
}

const LoLTeam = ({team}: iLolTeamComponent) => {
    return (
        <Container>
            <Headline headline={3}>
                {team.name}
            </Headline>
            <LeaugeHeadline headline={4}>
                {team.league}
            </LeaugeHeadline>
            <ListWrapper>
                {team.teamMembers.map(member => <LoLMember key={member.id} member={member} />)}
            </ListWrapper>
            <Markdown>
                {team.description}
            </Markdown>
        </Container>
    );
};

export default LoLTeam;
