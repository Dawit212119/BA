"use server";
import prisma from "@/lib/prisma";
type emailProps = {
  email: string;
};
const EmailVerify = async ({ email }: emailProps) => {
  const isVerfied = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (isVerfied?.emailVerified === true) {
    return true;
  }
  return false;
};

export default EmailVerify;
