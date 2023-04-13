import { iBackendBranche } from "./iBranche";

export interface iBranchUserMemberShip {
  id: number;
  userId: number;
  branchId: number;
  state: string;
  wantsToLeave: boolean;
  isActive: boolean;
  isExported: boolean;
  wantsToLeaveAt: string;
  exportedAt: string;
  sepaDate: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  branch: iBackendBranche;
}

export default iBranchUserMemberShip;
