import React from 'react';
import tw from 'twin.macro';
import iLolTeam from "../../Interfaces/iLoLTeam";
import LoLTeam from "./LoLTeam";

const List = tw.div`
    flex
    flex-col
    gap-base
    max-w-screen-xl
    p-small
    w-full
    my-base
`;

interface iLoLTeamList {
    teams: iLolTeam[];
}
const LoLTeamList = ({teams} :iLoLTeamList) => {
    return (
        <List>
            {teams.map(team => <LoLTeam key={team.id} team={team} />)}
        </List>
    );
};

export default LoLTeamList;
