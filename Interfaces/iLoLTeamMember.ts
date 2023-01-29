import iImage from "./iImage";

export interface iLoLTeamMember {
    id: number;
    name: string;
    lolName: string;
    image: iImage;
    lolLane: {
        data: {
            attributes: {
                name: string;
                image: iImage;
            }
        }
    };
}

export default iLoLTeamMember;
