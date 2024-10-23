import NextAuth, { CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "./lib/db";

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialProvider({
      name: "credential",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "johndow@email.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password here",
        },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) {
          throw new InvalidLoginError();
        }
        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
        if (!user) {
          throw new InvalidLoginError();
        }

        const passwordIsMached = await bcrypt.compare(password, user.password);

        if (passwordIsMached == false) {
          throw new InvalidLoginError();
        }
        const { password: passwordA, ...rest } = user;
        return rest;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
});
