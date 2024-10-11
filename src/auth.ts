import NextAuth, { CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";

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
      authorize: (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;
        console.log(email, password);
        if (password !== "abcd") {
          throw new CredentialsSignin({ cause: "password not match" });
          return;
        }

        const user = {
          email,
          id: "abc",
        };
        return user;
      },
    }),
  ],
});
