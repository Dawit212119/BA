import Signoutbutton from "@/components/signout-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const Profile = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) return <p>Unautorized</p>;
  console.log(session);

  return (
    <div>
      <Signoutbutton />
      {JSON.stringify(session)}{" "}
    </div>
  );
};

export default Profile;
