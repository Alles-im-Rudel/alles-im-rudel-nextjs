import iImage from "./iImage";
import iPlayerBadges from "./iPlayerBadges";

export interface iAirsoftTeam {
    id: number;
    callName: string;
    name: string;
    joinedAt: string;
    link: string;
    position: string;
    image: iImage;
    playerBadges: { data: iPlayerBadges[] }
}

export default iAirsoftTeam;
