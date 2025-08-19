import { auth, ErrorCode } from "@/lib/auth";
import { APIError } from "better-auth/api";

export async function SignInWithEmail(formdata: FormData) {
  const password = String(formdata.get("password"));
  if (!password) return { error: "password required" };
  const email = String(formdata.get("email"));
  if (!email) return { error: "password required" };

  try {
    const response = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      asResponse: true,
    });
    console.log("response", response);

    return { error: null };
  } catch (error) {
    if (error instanceof APIError) {
      const Errorcode = error.body ? (error.body.code as ErrorCode) : "UNKNOWN";

      switch (Errorcode) {
        default: {
          return { error: error.message };
        }
      }
    } else {
      return { error: "server error" };
    }
  }
}
