import iPartner from "./iPartner";
import iMedia from "./iMedia";

export interface iBranche {
  id: string;
  displayName: string;
  shortDescription: string;
  image: iMedia;
  description: {
    [k: string]: unknown;
  }[];
  leader: {
    name: string;
    description: string;
    image: iMedia;
    birthday: string;
  };
  partners?: string[] | iPartner[];
  layout: any;
  slug?: string;
  updatedAt: string;
  createdAt: string;
}

export interface iBackendBranche {
  id: number;
  name: string;
  description: string;
  price: number;
  activatedAt: string;
  isActive: boolean;
  isSelectable: boolean;
}

export default iBranche;
