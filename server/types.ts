import { $Enums, User } from "@prisma/client"

export interface UserRequestBody { 
    name:string;age:number;email:string
    userPreference: {emailUpdates:boolean};
}

export interface UserParams  {
    userParams: {name:string;age:number;email:string};
    userPreferenceParams: {emailUpdates:boolean};
}

export interface ErrorObject {
    code: number
    message: string
}

export interface UserObj {
    id: string;
    name: string | null;
    email: string;
    age: number;
    role: $Enums.Role;
    userPreferenceId: string | null;
}

export interface CatchResObj {
    code: number
    message: string | undefined
}

export interface LogInReqBody {
    email: string
}