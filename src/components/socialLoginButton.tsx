"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useState } from "react";

interface scocialLoginProps {
  provider: "google" | "github";
  signup?: boolean;
}

const SocialLoginButton = ({ provider, signup }: scocialLoginProps) => {
  const [isPending, setPending] = useState(false);
  const action = signup ? "Up" : "In";
  const social = provider === "google" ? "Google" : "Github";

  const handleClick = async () => {
    await authClient.signIn.social({
      provider,
      callbackURL: "/profile",
      errorCallbackURL: "/auth/login/error",
      fetchOptions: {
        onRequest: () => {
          setPending(false);
        },
        onResponse: () => {
          setPending(true);
        },
        onSuccess: () => {
          toast.success("Login Success");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    });
  };
  return (
    <div>
      <Button onClick={handleClick} disabled={isPending}>
        Sign {action} with {social}
      </Button>
    </div>
  );
};

export default SocialLoginButton;
