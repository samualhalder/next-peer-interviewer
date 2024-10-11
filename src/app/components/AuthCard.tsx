import React from "react";
import { Button, Divider, TextField } from "@mui/material";
import { FcGoogle } from "react-icons/fc";

import Link from "next/link";
export default function AuthCard({ page }: { page: string }) {
  const redirectPage = page === "Sign In" ? "signup" : "signin";

  return (
    <div className=" shadow-2xl w-[400px] h-[500px] p-10 flex justify-center items-center flex-col relative gap-3 rounded-md">
      <h1 className=" absolute top-3 text-3xl">{page} </h1>
      <form action="" className="w-full flex  flex-col gap-5">
        <div>
          <TextField
            className="w-[95%]"
            label="Email"
            type="Email"
            autoComplete="current-email"
          />
        </div>
        <div>
          <TextField
            className="w-[95%]"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
        </div>
        <Button className="w-[95%]" variant="contained">
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
        already have an account ? {redirectPage}
      </Link>
    </div>
  );
}
