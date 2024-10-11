import { Button, Divider, TextField } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import React from "react";
import Link from "next/link";
import AuthCard from "../components/AuthCard";

export default function Page(props) {
  return (
    <div className="h-screen flex justify-center place-items-center flex-col">
      <AuthCard page="Sign In" />
    </div>
  );
}
