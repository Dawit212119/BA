"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import EmailVerify from "@/app/actions/EmailVerify";

export const ResetPassword = () => {
  const [isPending, setPending] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData(e.target as HTMLFormElement);
    const email = String(formdata.get("email"));
    const isVerfied = await EmailVerify({ email });
    if (!isVerfied) {
      return router.push("/auth/verify?error=email_is_not_verfied");
    }
    await authClient.forgetPassword({
      email,
      redirectTo: "/auth/resetPassword",
      fetchOptions: {
        onRequest: () => {
          setPending(true);
        },
        onResponse: () => {
          setPending(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },

        onSuccess: () => {
          toast.success("verfication link sent. Check your email or spam ");
          router.push("/auth/forgotPassword/success");
        },
      },
    });
  };
  return (
    <div className="w-[500px]">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-7">
        <Label className="text-center space-y-4">Please fill ypur email</Label>

        <div className="flex gap-2">
          <Label htmlFor="email" className="text-xl font-bold">
            Email
          </Label>
          <Input type="email" id="email" name="email" />
        </div>
        <Button type="submit" disabled={isPending}>
          Resend Email Verification
        </Button>
      </form>
    </div>
  );
};
