import { ResetPassword } from "@/components/forgotPassword";
import prisma from "@/lib/prisma";
import React from "react";

const ForgetPassword = () => {
  return (
    <div className="flex  items-center justify-center h-screen">
      <ResetPassword /> <></>
    </div>
  );
};

export default ForgetPassword;
