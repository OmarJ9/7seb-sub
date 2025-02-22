"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/utils/supabase/server";
import { ActionResponse } from "@/types/types";
import { redirect, RedirectType } from "next/navigation";
import { cookies } from "next/headers";
import { getURL } from "@/utils/helpers";
import { Provider } from "@supabase/supabase-js";

export async function login(
  prevState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const supabase = await createClient();
    const email = formData.get("email") as string;

    if (!email) {
      return {
        success: false,
        message: "Email is Required",
      };
    }

    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`,
      },
    });

    if (error) {
      console.error("Login Error:", error);
      return {
        success: false,
        message: error.message,
      };
    }

    revalidatePath("/", "layout");
    return {
      success: true,
      message: "An email has been sent to you to confirm your account",
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  (await cookies()).delete("supabase-auth-token");
  redirect("/login", RedirectType.replace);
}

export async function oAuthSignIn(provider: Provider) {
  if (!provider) {
    return redirect("/login?message=No provider selected");
  }

  const supabase = await createClient();
  const redirectUrl = getURL("/auth/callback");
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectUrl,
    },
  });

  if (error) {
    redirect("/login?message=Could not authenticate user");
  }

  return redirect(data.url);
}
