import iTag from "./iTag";
import iThumbnail from "./iThumbnail";
import iUser from "./iUser";

export interface iBoardOfDirecor {
    id: number;
    attributes: {
        birthday: string;
        craetedAt: string;
        instagramLink: string;
        linkedinLink: string;
        name: string;
        publishedAt: string;
        snapchatLink: string;
        updatedAt: string;
        image: {
            data: {
                attributes: {
                    alternativeText: string | null
                    url: string
                }
                id: number
            }
        }
    }
}

export default iBoardOfDirecor;
