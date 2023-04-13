import iCountry from "./iCountry";

export interface iSignature {
  id: number;
  fileMimeType: string;
  fileName: string;
  fileSize: string;
  image: string;
}

export interface iBankAccount {
  id: number;
  iban: string;
  bic: string;
  firstName: string;
  lastName: string;
  fullName: string;
  street: string;
  postcode: string;
  city: string;
  signatureCity: string;
  country: iCountry;
  signature: iSignature;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export default iBankAccount;
