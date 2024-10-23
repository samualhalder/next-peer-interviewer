"use client";

import React, { useState } from "react";
import { Alert, Button, Divider, TextField } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { signInFuntion } from "../utils/signInFunction";

export default function SignIn() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const [fromData, setFromData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFromData({ ...fromData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    const { email, password } = fromData;
    if (email == "" || password == "") {
      setErrorMessage("please insert all the fields");
      return;
    }
    try {
      await signInFuntion({ email, password });
      router.push("/");
    } catch (error) {
      setErrorMessage("wrong credentials");
    }
  };

  return (
    <div className=" shadow-2xl w-[400px] min-h-[600px] p-10 flex justify-center items-center flex-col relative gap-3 rounded-md">
      <h1 className=" absolute top-3 text-3xl tracking-widest font-sans font-semibold">
        Sign In
      </h1>
      <form className="w-full flex  flex-col gap-5" onSubmit={handleSubmit}>
        <div>
          <TextField
            className="w-[95%]"
            label="Email"
            type="Email"
            name="email"
            value={fromData.email}
            onChange={(e) => handleChange(e)}
            autoComplete="current-email"
          />
        </div>

        <div>
          <TextField
            className="w-[95%]"
            label="Password"
            type="password"
            name="password"
            value={fromData.password}
            onChange={(e) => handleChange(e)}
            autoComplete="current-password"
          ></TextField>
        </div>
        {errorMessage && (
          <Alert className="w-[95%]" severity="error">
            {errorMessage}
          </Alert>
        )}
        {
          <Button className="w-[95%]" variant="contained" type="submit">
            Sing In
          </Button>
        }
      </form>
      <Divider>OR</Divider>
      <form action="" className="w-full">
        <Button variant="outlined" color="success" className="w-[95%]">
          <FcGoogle className="mr-5" size={20} />
          Continue With Google
        </Button>
      </form>
      <Link
        className="text-blue-500 mt-10 hover:text-blue-300"
        href={`/signup`}
      >
        don't have an account? sign up
      </Link>
    </div>
  );
}
