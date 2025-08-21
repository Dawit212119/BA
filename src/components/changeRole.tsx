"use client";
import { UserRole } from "@/generated/prisma";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export const ChangeRole = ({
  userId,
  role,
}: {
  userId: string;
  role: string;
}) => {
  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as UserRole;
    const canChangeRole = await authClient.admin.hasPermission({
      permissions: { user: ["set-role"] },
    });

    console.log(value);
    console.log(canChangeRole);
    if (canChangeRole.error) {
      toast.error("Forbidden");
    }
    await authClient.admin.setRole({
      userId,
      role: value,
      fetchOptions: {
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.error("Update Success");
        },
      },
    });
  };

  return (
    <div>
      <select value={role} onChange={handleChange} name="" id="">
        <option value="Admin">ADMIN</option>
        <option value="User">USER</option>
      </select>
    </div>
  );
};
