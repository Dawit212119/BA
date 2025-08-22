import { SendEmialVerfication } from "@/components/SendEmialVerfication";
import { redirect } from "next/navigation";

type searchProps = {
  searchParams: Promise<{ error: string }>;
};

const VerfiyError = async ({ searchParams }: searchProps) => {
  const sp = await searchParams;
  if (!sp.error) redirect("/profile");
  return (
    <div>
      {!sp.error && <p>Email Verified</p>}
      {sp.error === "invalid_token" && (
        <p className="text-red-500">Invalid Token!</p>
      )}
      {sp.error === "token_expired" && (
        <p className="text-red-500">Token Expired</p>
      )}
      {sp.error === "email_is_not_verfied" && (
        <p className="text-red-500">Please Verify Your Email</p>
      )}
      <div>
        <SendEmialVerfication />
      </div>
    </div>
  );
};

export default VerfiyError;
