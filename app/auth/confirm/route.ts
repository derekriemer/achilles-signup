import { type EmailOtpType } from '@supabase/supabase-js'
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url);
  const token_hash = requestUrl.searchParams.get("token_hash");
  const type = requestUrl.searchParams.get('type') as EmailOtpType | null
  const origin = requestUrl.origin;
  if (!type || !token_hash) {
    return NextResponse.redirect(`${origin}/auth-error?message=${escape("Invalid authentication code provided by auth")}`);
  }
  const supabase = await createClient();
  console.log(token_hash)
  const {error} = await supabase.auth.verifyOtp({type, token_hash});
  if (error) {
    console.error(error);
    return NextResponse.redirect(`${origin}/auth-error?message=${escape(error.toString())}`);
  }
  return NextResponse.redirect(`${origin}/protected/`);
}
