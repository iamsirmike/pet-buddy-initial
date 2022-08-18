import { UserData } from "./userInterface";

export interface AccountData extends UserData {
    userId: string;
    username: string;
    email: string;
    password: string;
    isVerified: boolean;
  }