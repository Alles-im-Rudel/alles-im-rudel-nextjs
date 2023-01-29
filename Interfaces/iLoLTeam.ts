import iLoLTeamMember from "./iLoLTeamMember";

export interface iLolTeam {
    id: number;
    name: string;
    league: string;
    teamMembers: iLoLTeamMember[];
}

export default iLolTeam;
