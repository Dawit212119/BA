import Signoutbutton from "@/components/signout-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

const Profile = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect("/auth/login");
  console.log(session);

  return (
    <div className="py-20 px-16 flex items-center">
      <Signoutbutton />
      {session.user.role === "Admin" && (
        <Link href="/dashboard/admin" className="font-bold">
          Go to Admin Dashboard
        </Link>
      )}
      {JSON.stringify(session)}{" "}
    </div>
  );
};

export default Profile;
