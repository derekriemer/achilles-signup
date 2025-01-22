"use server";

import { castString } from "@/types/guards";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

const EMAIL_REGEXP = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z][A-Za-z0-9-_]+$/;

interface Field  {
  value?: string;
  error?: string;
}

export interface SignupState {
  // Error message from supabase
  errorMessage?: string;
  // success message from supabase or us.
  message?: string;
  fields: {
    email: Field;
    name: Field;
    password: Field;
  };
}

export async function signUpAction(prevState: SignupState, formData: FormData): Promise<SignupState> {
  const returnedData: SignupState = {
    fields: {
      email : {
        value : formData.get("email")?.toString(),
      },
      name: {
        value: formData.get("name")?.toString(),
      },
      password : {
        value: formData.get("password")?.toString(),
      },
    },
  };
  let errors = false;
  // Validate required fields
  // todo ( someone): Extract this to a validation util, for ease of testing and readability.
  // It's a bad idea to use a regexp for email validation, but poop.
  if (!returnedData.fields.email.value) {
    errors = true;
    returnedData.fields.email.error = "No Email Provided.";
  } else if( !returnedData.fields.email.value.match(EMAIL_REGEXP)) {
    errors = true;
    returnedData.fields.email.error= `Your email ${returnedData.fields.email.value} is not a valid email.`;
  }
  if( !returnedData.fields.name.value) {
    errors = true;
    returnedData.fields.name.error= "No password provided.";
  }
  if (!returnedData.fields.password.value) {
    errors = true;
    returnedData.fields.password.error = "No password provided.";
  }
  //todo (someone): Add password validation, if supabase doesn't provide it.
  if (errors) {
    return returnedData;
  }
  
  // action
  const origin = (await headers()).get("origin") || "";
  try {
    const supabase = await createClient();
    // We actually already narrowed type when validating for fields to remove the bad types, but the logic is too tricky for typescript to infer this.
    const { error } = await supabase.auth.signUp({
      email: castString(returnedData.fields.email.value),
      password: castString(returnedData.fields.password.value),
      options: {
        emailRedirectTo: `${origin}/auth/confirm`,
        data: {
          name: castString(returnedData.fields.name.value),
        }
      },
    });
    if (error) {
      console.error(`Signup error: ${error.code} - ${error.message}`);
        returnedData.errorMessage = error.message;
        return returnedData;
    }
      returnedData.message = "Thanks for signing up! Please check your email for a verification link.";
  } catch (err) {
    console.error("Unexpected signup error:", err);
    returnedData.errorMessage= "An unexpected error occurred. Please try again later.";
  }
  return returnedData;
}
