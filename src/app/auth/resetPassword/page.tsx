import PasswordForm from "@/components/passwordForm";
import { redirect } from "next/navigation";

interface searchParamsProps {
  searchParams: Promise<{ token: string }>;
}
const ResetPasswordPage = async ({ searchParams }: searchParamsProps) => {
  const { token } = await searchParams;
  console.log(token);
  if (!token) redirect("/auth/register");
  return (
    <div>
      <PasswordForm token={token} />
    </div>
  );
};

export default ResetPasswordPage;
