import iTag from "./iTag";
import iThumbnail from "./iThumbnail";
import iUser from "./iUser";

export interface IPost {
    image: any;
    id: number;
    title: string;
    text: unknown;
    userId: number;
    updatedAt: string;
    createdAt: string;
    likes: number;
    thumbnail: iThumbnail;
    user: iUser;
    tag: iTag;
}
export default IPost;
