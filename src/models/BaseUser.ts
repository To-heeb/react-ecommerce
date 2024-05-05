export interface BaseUser
{

    Username?: string;

    Email?: string;

    accessToken: string;

    id: number;
}

export enum UserType
{
    None = 0,
    Buyer = 1,
    Seller = 2,
    Staff = 3,
}