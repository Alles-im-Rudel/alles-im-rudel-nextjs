import iLoLTeamMember from "./iLoLTeamMember";

export interface iLolTeam {
    id: number;
    name: string;
    league: string;
    description: string;
    teamMembers: iLoLTeamMember[];
}

export default iLolTeam;
