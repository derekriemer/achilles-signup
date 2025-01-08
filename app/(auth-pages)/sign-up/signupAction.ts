"use server";

import { castString } from "@/types/guards";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

const EMAIL_REGEXP = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z][A-Za-z0-9-_]+$/;

export interface SignupState {
  errorMessage?: string;
  message?: string;
  errors: {
    email?: string;
    name?: string;
    password?: string;
  };
}

export async function signUpAction(prevState: SignupState, formData: FormData): Promise<SignupState> {
  const email = formData.get("email")?.toString();
  const name= formData.get("name")?.toString();
  const password = formData.get("password")?.toString();
  
  const returnedData: SignupState = {message: null, errors:{},};
  let errors = false;
  // Validate required fields
  // todo ( someone): Extract this to a validation util, for ease of testing and readability.
  // It's a bad idea to use a regexp for email validation, but poop.
  if (!email) {
    errors = true;
    returnedData.errors.email = "No Email Provided.";
  } else if( !email.match(EMAIL_REGEXP)) {
    errors = true;
    returnedData.errors.email = `Your email is not a valid email.`;
    
  }
  if( !name) {
    errors = true;
    returnedData.errors.name= "No password provided."
  }
  if (!password) {
    errors = true;
    returnedData.errors.password = "No password provided."
  }
  //todo (someone): Add password validation, if supabase doesn't provide it.
  if (errors) {
    return returnedData;
  }
  
  // action
  const origin = (await headers()).get("origin") || "";
  try {
    const supabase = await createClient();
    // We actually already narrowed type for email and password to remove the bad types, but the logic is too tricky to realize it.
    const { error } = await supabase.auth.signUp({
      email: castString(email),
      password: castString(password),
      options: {
        emailRedirectTo: `${origin}/auth/confirm`,
        data: {
          name: castString(name),
        }
      },
    });
    if (error) {
      console.error(`Signup error: ${error.code} - ${error.message}`);
      return { 
        errorMessage: error.message, 
        message: null,
        errors: {
        },
      };
    }
    
    return {
      message: "Thanks for signing up! Please check your email for a verification link.",
      errors: {},
    };
  } catch (err) {
    console.error("Unexpected signup error:", err);
    return {
      errorMessage: "An unexpected error occurred. Please try again later.",
      message: null,
      errors: { },
    };
  }
}
