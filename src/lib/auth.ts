import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { hashPassword, verifyPassword } from "./argon2";
import { nextCookies } from "better-auth/next-js";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { normalizeName, VALID_DOMAINS } from "./utils";
import { admin } from "better-auth/plugins";
import { UserRole } from "@/generated/prisma";
import { ac, roles } from "./permission";
import SendEmailAction from "@/app/actions/send-Email.action";
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  session: { expiresIn: 30 * 24 * 60 * 60 },
  socialProviders: {
    google: {
      prompt: "select_account",
      accessType: "offline",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      prompt: "select_account",
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    password: {
      hash: hashPassword,
      verify: verifyPassword,
    },
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 60 * 60,
    sendVerificationEmail: async ({ user, url }) => {
      const link = new URL(url);
      link.searchParams.set("callbackURL", "/auth/verify");

      await SendEmailAction({
        to: user.email,
        subject: "Verfiy Your Email",
        meta: {
          description: "Please verify your email to complete registration",
          link: String(link),
        },
      });
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email") {
        console.log(ctx);
        const email = String(ctx.body.email);
        const domain = email.split("@")[1].toLowerCase();
        const ValidDomain = VALID_DOMAINS();
        if (!ValidDomain.includes(domain)) {
          throw new APIError("BAD_REQUEST", { message: "Invalid Email!" });
        }
        const name = normalizeName(ctx.body.name);

        return {
          context: {
            ...ctx,
            body: {
              ...ctx.body,

              name,
            },
          },
        };
      }
    }),
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const admin_email = process.env.ADMIN_EMAIL?.split(";") || [];
          if (admin_email.includes(user.email)) {
            return { data: { ...user, role: "Admin" } };
          } else {
            return {
              data: { ...user },
            };
          }
        },
      },
    },
  },
  user: {
    additionalFields: {
      role: {
        type: ["User", "Admin"],
        input: false,
      },
    },
  },
  plugins: [
    nextCookies(),
    admin({
      defaultRole: UserRole.User,
      adminRoles: UserRole.Admin,
      ac,
      roles,
    }),
  ],
  advanced: {
    database: {
      generateId: false,
    },
  },
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN";
