import { UserData } from "./userInterface";

export interface UserProfileData extends UserData {
    userId: string;
    firstname: string;
    lastname: string;
    phone: string;
}