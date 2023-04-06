export interface iBankAccount {
    id: number,
    iban: string,
    bic: string,
    firstName: string,
    lastName: string,
    fullName: string,
    street: string,
    postcode: string,
    city: string,
    signatureCity: string,
    country: string,
    signature: string,
    createdAt: string,
    updatedAt: string,
    deletedAt: string,
}

export default iBankAccount;
