import iImage from "./iImage";
import iPartner from "./iPartner";
import iLeader from "./iLeader";
import iAirsoftTeam from "./iAirsoftTeam";
import iGallery from "./iGallery";

export interface iBranche {
    id: number;
    attributes: {
        slug: string;
        displayName: string;
        description: string;
        shortDescription: string;
        leader: iLeader;
        image: iImage;
        backgroundImage: iImage;
        gallery: {
            data: iGallery[]
        };
        partners: {
            data: iPartner[]
        };
        airsoftTeam: iAirsoftTeam[];
    }
}

export default iBranche;
