import { UserData } from "./userInterface";

export interface UserProfileData extends UserData {
    userId: string;
    email: string;
    firstname: string;
    lastname: string;
    phone: string;
}