import Usertabledata from "@/components/user-table-data";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect("/auth/login");
  if (session.user.role !== "Admin") {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 w-400px font-bold text-2xl">Forbidden</p>
      </div>
    );
  }
  const users = await prisma.user.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <div className=" max-w-screen flex flex-col mt-15 p-20 space-y-8 ">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <Usertabledata user={users} />
    </div>
  );
};

export default Dashboard;
