import { User } from "@prisma/client"

export interface UserRequestBody { 
    name:string;age:number;email:string
    userPreference: {emailUpdates:boolean};
}

export interface UserParams  {
    userParams: {name:string;age:number;email:string};
    userPreferenceParams: {emailUpdates:boolean};
}