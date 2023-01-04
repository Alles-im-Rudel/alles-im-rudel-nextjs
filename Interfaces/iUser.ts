import iThumbnail from "./iThumbnail";

export interface iUser {
    id: number;
    saluation: string;
    firstName: string;
    lastName: string;
    fullName: string;
    age: number;
    birthday: string;
    updatedAt: string;
    createdAt: string;
    thumbnail: iThumbnail;
}
export default iUser;
