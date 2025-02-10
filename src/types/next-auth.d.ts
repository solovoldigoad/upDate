import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User{
      _id?: string;
      email?: string;
      username?: string;
      image?: string;
      phoneNumber?: number | null;
  }

  interface Session {
    user:{
    _id?: string;
    username?: string;
    image?: string;
    phoneNumber?: number | null;
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt"{
  interface JWT{
    _id?: string;
    username?: string
    image?:string
    phoneNumber?:number | null
  }
}
