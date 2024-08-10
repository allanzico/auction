import {Lucia} from "lucia"
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import prisma from "@/db/database";


const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
    sessionCookie: {
     name: "lucia-auth-session",
     expires: false,
     attributes: {
        secure: process.env.NODE_ENV === "production",
      }
    },
});