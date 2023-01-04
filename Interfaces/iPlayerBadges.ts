import iImage from "./iImage";

export interface iPlayerBadges {
    id: number;
    attributes: {
        name: string;
        image: iImage;
    }
}

export default iPlayerBadges;
