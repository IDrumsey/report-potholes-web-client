import { createClient } from "@supabase/supabase-js"

export const getServiceSupabase = () => {
  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.SUPABASE_API_SERVICE_ROLE_ACCESS_KEY
  ) {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_API_SERVICE_ROLE_ACCESS_KEY
    )
  }
}
