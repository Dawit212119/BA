"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const SendEmialVerfication = () => {
  const [isPending, setPending] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData(e.target as HTMLFormElement);
    const email = String(formdata.get("email"));
    await authClient.sendVerificationEmail({
      email,
      callbackURL: "/auth/verify",
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
          router.push("/auth/verify/success");
        },
      },
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flec gap-2">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" name="email" />
        </div>
        <Button type="submit" disabled={isPending}>
          Resend Email Verification
        </Button>
      </form>
    </div>
  );
};
