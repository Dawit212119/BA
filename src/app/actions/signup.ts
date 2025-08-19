import { auth } from "@/lib/auth";

export async function SignUnWithEmail(formdata: FormData) {
  const name = String(formdata.get("name"));
  if (!name) return { error: "name required" };

  const password = String(formdata.get("password"));
  if (!password) return { error: "password required" };
  const email = String(formdata.get("email"));
  if (!email) return { error: "email required" };

  try {
    const response = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
      asResponse: true,
    });
    console.log("response", response);

    return { error: null };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "server error" };
    }
  }
}
