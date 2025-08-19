"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Signoutbutton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess() {
          router.push("/auth/login");
        },
        onError(ctx) {
          toast.error(ctx.error.message);
        },
      },
    });
  };
  return (
    <div>
      <Button variant="destructive" onClick={handleSignOut}>
        SignOut
      </Button>
      ;
    </div>
  );
};

export default Signoutbutton;
