import iMedia from "./iMedia";

export interface IBoardMember {
  id: string;
  name: string;
  birthday: string;
  image: string | iMedia;
  instagramLink: string;
  snapchatLink: string;
  linkedinLink: string;
  roles?: ("admin" | "user")[];
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string;
  resetPasswordExpiration?: string;
  salt?: string;
  hash?: string;
  loginAttempts?: number;
  lockUntil?: string;
  password?: string;
}

export default IBoardMember;
