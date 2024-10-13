"use client";
import React, { useState } from "react";
import { Alert, Button, Divider, TextField } from "@mui/material";
import { FcGoogle } from "react-icons/fc";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthCard({ page }: { page: string }) {
  const redirectPage = page === "Sign In" ? "signup" : "signin";
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
    if (redirectPage !== "signup") {
      try {
        const response = await fetch("/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fromData),
        });
        const data = await response.text();
        if (!response.ok) {
          setErrorMessage(data);
        } else {
          router.push("/signin");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("for sign in");
    }
  };

  return (
    <div className=" shadow-2xl w-[400px] min-h-[600px] p-10 flex justify-center items-center flex-col relative gap-3 rounded-md">
      <h1 className=" absolute top-3 text-3xl">{page} </h1>
      <form
        action=""
        className="w-full flex  flex-col gap-5"
        onSubmit={handleSubmit}
      >
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
        {redirectPage !== "signup" && (
          <div>
            <TextField
              className="w-[95%]"
              label="Username"
              type="text"
              name="username"
              value={fromData.username}
              onChange={(e) => handleChange(e)}
              autoComplete="current-email"
            />
          </div>
        )}
        <div>
          <TextField
            className="w-[95%]"
            label="Password"
            type="password"
            name="password"
            value={fromData.password}
            onChange={(e) => handleChange(e)}
            autoComplete="current-password"
          />
        </div>
        {errorMessage && (
          <Alert className="w-[95%]" severity="error">
            {errorMessage}
          </Alert>
        )}
        <Button className="w-[95%]" variant="contained" type="submit">
          {page}
        </Button>
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
        href={`/${redirectPage}`}
      >
        {redirectPage !== "signin"
          ? "don't have an account? sign up"
          : "already have an account? sign in"}
      </Link>
    </div>
  );
}
