import iTag from "./iTag";
import iThumbnail from "./iThumbnail";
import iUser from "./iUser";

export interface iImage {
    data: {
        attributes: {
            alternativeText: string
            url: string
        }
        id: number
    }
}

export default iImage;
