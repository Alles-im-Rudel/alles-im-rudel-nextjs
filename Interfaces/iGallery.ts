import iImage from "./iImage";

export interface iGallery {
    id: number;
    attributes: {
        alternativeText: string | null
        url: string
    };
}

export default iGallery;
