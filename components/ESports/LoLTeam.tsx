import React from 'react';
import tw from 'twin.macro';
import iLolTeam from "../../Interfaces/iLoLTeam";
import Headline from '../Layout/Headline';
import LoLMember from "./LoLMember";
import Markdown from "../Layout/Markdown";

const Container = tw.div`
    flex
    flex-col
    gap-smaller
`;

const ListWrapper = tw.div`
    flex
    gap-small
    flex-wrap
    justify-center
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
            <Headline headline={4}>
                {team.league}
            </Headline>
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
