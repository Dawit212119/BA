"use client";
import { Button } from "@/components/ui/button";
import { CSSProperties } from "react";
import { authClient } from "@/lib/auth-client";
import { ClipLoader } from "react-spinners";
import Link from "next/link";
import React from "react";
const override: CSSProperties = {
  display: "block",
  margin: "auto auto",
  borderColor: "black",
};

const page = () => {
  const { data: session, isPending } = authClient.useSession();
  if (isPending) {
    return (
      <p className="my-auto">
        <ClipLoader
          color="black"
          loading={isPending}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </p>
    );
  }
  const href = session ? "/profile" : "/auth/login";
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col space-y-6">
        {" "}
        <p>Welcome {session?.user.name}! </p>
        <Button asChild>
          <Link href={href}>Get Started</Link>
        </Button>{" "}
      </div>
    </div>
  );
};

export default page;
