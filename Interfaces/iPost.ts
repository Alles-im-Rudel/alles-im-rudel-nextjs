import iBoardMember from "./iBoardMember";
import iTag from "./iTag";
import iMedia from "./iMedia";

export interface iPost {
  id: string;
  title: string;
  text: {
    [k: string]: unknown;
  }[];
  publishedDate: string;
  startAt: string;
  endAt: string;
  image: iMedia;
  author: iBoardMember;
  tag: iTag;
  updatedAt: string;
  createdAt: string;
}
export default iPost;
