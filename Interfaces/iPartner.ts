import iMedia from "./iMedia";
import iBranche from "./iBranche";

export interface iPartner {
  id: string;
  name: string;
  logo: iMedia;
  smallLogo?: string | iMedia;
  benefits: {
    [k: string]: unknown;
  }[];
  howToGet: {
    [k: string]: unknown;
  }[];
  branches?: string[] | iBranche[];
  slug?: string;
  updatedAt: string;
  createdAt: string;
}

export default iPartner;
