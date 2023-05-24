import iPermission from "./iPermission";
import iUser from "./iUser";

export interface iUserGroup {
  id: number;
  displayName: string;
  levelId: number;
  description: string;
  color: string;
  permissions: iPermission[];
  permissionsCount: number;
  users: iUser[];
  usersCount: number;
}

export default iUserGroup;
