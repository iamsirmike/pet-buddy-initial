import { UserData } from "./userInterface";

export interface UserProfileData extends UserData {
    userId: string;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    phone: string;
    password: string;
    isVerified: boolean;
}