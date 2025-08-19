"use client";
import { SignInWithEmail } from "@/app/actions/signin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const Register = () => {
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setPending(true);
    const formdata = new FormData(e.target as HTMLFormElement);
    // const { error } = await SignInWithEmail(formdata);
    // if (error) {
    //   toast.error(error);
    //   console.log(error);
    // } else {
    //   toast.success("Logging success");
    // }

    // setPending(false);

    const password = String(formdata.get("password"));
    if (!password) return toast.error("password required");
    const email = String(formdata.get("email"));
    if (!email) return toast.error("email required");

    const { data, error } = await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
          toast.success("registerd");
          router.push("/profile");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onResponse: () => {
          setPending(false);
        },
        onRequest: () => {
          setPending(true);
        },
      }
    );
    console.log(data);
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
        <Button type="submit" className="cursor-pointer" disabled={pending}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Register;
