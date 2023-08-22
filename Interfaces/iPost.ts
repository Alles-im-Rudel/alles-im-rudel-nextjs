import iTag from "./iTag";
import iImage from "./iImage";
import iBoardOfDirector from "./iBoardOfDirecor";

export interface IPost {
  id: number;
  attributes: {
    title: string;
    text: string;
    updatedAt: string;
    createdAt: string;
    tag: iTag;
    board_of_director: iBoardOfDirector;
    images: iImage[];
  };
}
export default IPost;
