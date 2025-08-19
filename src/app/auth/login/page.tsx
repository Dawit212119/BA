"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import React from "react";
import { toast } from "sonner";

const Register = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.target as HTMLFormElement);

    const password = String(formdata.get("password"));
    if (!password) return toast.error("password required");
    const email = String(formdata.get("email"));
    if (!email) return toast.error("email required");
    console.log(name);
    console.log(e.target);

    const { data, error } = await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
          toast.success("registerd");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onResponse: () => {},
      }
    );
  };
  return (
    <div className=" max-w-screen flex flex-col mt-15 p-20 space-y-8 ">
      <h1 className="text-2xl font-bold">Register Form</h1>

      <form onSubmit={handleSubmit} className="space-y-8 ">
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="email">email</Label>
          <Input id="email" name="email" type="email" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="password">password</Label>
          <Input id="password" name="password" type="password" />
        </div>
        <Button type="submit" className="cursor-pointer">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Register;
