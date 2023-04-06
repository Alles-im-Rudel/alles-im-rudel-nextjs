import iThumbnail from "./iThumbnail";
import iPermission from "./iPermission";
import iBankAccount from "./iBankAccount";

export interface iUser {
    id: number;
    salutation: string;
    firstName: string;
    lastName: string;
    fullName: string;
    age: number;
    birthday: string;
    email: string;
    phone: string;
    street: string;
    postcode: string;
    city: string;
    emailVerifiedAt: string;
    wantsEmailNotification: boolean;
    isActive: boolean;
    activatedAt: string;
    levelId: number;
    country: string;
    bankAccount: iBankAccount;
    branchUserMemberShips: string;
    permissions: iPermission[];
    permissionsCount: number;
    roles: string;
    rolesCount: number;
    userGroupsCount: number;
    branchUserMemberShipsCount: number;
    userGroups: string;
    mainSummoner: string;
    image: string;
    postsCount: string;
    commentsCount: string;
    likedCount: string;
    thumbnail: iThumbnail;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
}

export default iUser;
