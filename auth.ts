// src/auth.ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import db from "./lib/db";
import userModel from "./models/user";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "email", label: "Email" },
        password: { type: "password", label: "Password" },
      },
      async authorize(credentials: any) {
        await db();
        try {
          const email = credentials.email;
          const password = credentials.password;

          // Find the user by email
          const user = await userModel.findOne({ email });
          if (!user) {
            throw new Error("User does not exist!");
          }

          // Check if the password matches
          const isPasswordMatched = await bcryptjs.compare(password, user.password);
          if (!isPasswordMatched) {
            throw new Error("Password not matched!");
          }

          // Return user object including firstName and lastName
          return {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          };
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  callbacks: {
    async session({session, token}:{ session: any, token: any }) {
      if (token) {
        session.user.firstName = token.firstName as string | undefined;
        session.user.lastName = token.lastName as string | undefined;
        session.user.password = token.password as string | undefined;
      }
      return session;
    },
    async jwt({token, user}:{ token: any, user: any }) {
      if (user) {
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.password = user.password
      }
      return token;
    },
  },
};

export const { handlers } = NextAuth(authOptions);
