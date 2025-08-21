import { UserRole } from "@/generated/prisma";
import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

const statements = {
  ...defaultStatements,
  post: ["create", "read", "update", "delete", "update:own", "delete:own"],
} as const;
export const ac = createAccessControl(statements);

export const roles = {
  [UserRole.User]: ac.newRole({
    post: ["create", "update:own", "delete:own", "read"],
  }),
  [UserRole.Admin]: ac.newRole({
    ...adminAc.statements,
    post: ["create", "read", "update", "delete", "update:own", "delete:own"],
  }),
};
