"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const PasswordForm = ({ token }: { token: string }) => {
  const [isPending, setPending] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData(e.target as HTMLFormElement);
    const password = String(formdata.get("password"));
    const Confirmpassword = String(formdata.get("confirmpassword"));
    if (Confirmpassword !== password) {
      return toast.error("password not match!");
    }
    await authClient.resetPassword({
      newPassword: password,
      token,
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
          toast.success("Reset successful");
          router.push("/profile");
        },
      },
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" name="password" />
        </div>
        <div className="flex gap-2">
          <Label htmlFor="confirmpassword">Confirm password</Label>
          <Input type="password" id="confirmpassword" name="confirmpassword" />
        </div>
        <Button type="submit" disabled={isPending}>
          Reset my password
        </Button>
      </form>
    </div>
  );
};

export default PasswordForm;
