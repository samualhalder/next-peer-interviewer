"use server";
import { signIn } from "@/auth";
export const signInFuntion = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    // Make sure redirect is false to prevent server-side redirect and handle it manually
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return "sing in successfull";
  } catch (error) {
    return new Error(error);
  }
};
