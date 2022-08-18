import { Document } from "mongoose";

export interface UserData extends Document {
    userId: string;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    phone: string;
    password: string;
    isVerified: boolean;
  }