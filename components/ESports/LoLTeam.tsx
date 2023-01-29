import React from 'react';
import tw from 'twin.macro';
import iLolTeam from "../../Interfaces/iLoLTeam";
import Headline from '../Layout/Headline';
import LoLMember from "./LoLMember";

const Container = tw.div`

`;

const ListWrapper = tw.div`
    flex
    gap-4
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
        </Container>
    );
};

export default LoLTeam;
