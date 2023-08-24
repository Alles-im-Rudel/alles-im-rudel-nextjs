import iBranche from "./iBranche";

export interface iPartner {
  id: number;
  attributes: {
    name: string;
    benefits: string;
    howToGet: string;
    logo: {
      data: {
        attributes: {
          alternativeText: string | null;
          url: string;
        };
        id: number;
      };
    };
    smallLogo: {
      data: {
        attributes: {
          alternativeText: string | null;
          url: string;
        };
        id: number;
      };
    };
    branches: {
      data: iBranche[];
    };
  };
}

export default iPartner;
