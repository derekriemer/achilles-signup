import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url);
  const token_hash = requestUrl.searchParams.get("token_hash");
  const origin = requestUrl.origin;
  if (!token_hash) {
    return NextResponse.redirect(`${origin}/auth-error?message=${escape("Invalid authentication code provided by auth")}`);
  }
  const supabase = await createClient();
  const {error} = await supabase.auth.exchangeCodeForSession(token_hash);
  if (error) {
    return NextResponse.redirect(`${origin}/auth-error?message=${escape(error.toString())}`);
  }
  return NextResponse.redirect(`${origin}/protected/`);
}
