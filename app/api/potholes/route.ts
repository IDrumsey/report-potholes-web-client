import { NextResponse } from "next/server"
import { getServiceSupabase } from "@/app/supabase"

export async function POST(request: Request) {
  const { lat, lng } = await request.json()

  const supabase = getServiceSupabase()

  if (!supabase) {
    return NextResponse.json(
      {
        errors: [
          {
            message: "Failed to connect to supabase",
          },
        ],
      },
      { status: 500 }
    )
  }

  const res = await supabase
    .from("reported_potholes")
    .insert({ location_lat: lat, location_lng: lng })

  if (res.status == 201) {
    return NextResponse.json(
      {
        status: "good",
      },
      { status: 200 }
    )
  } else {
    return NextResponse.json(
      {
        errors: [
          {
            message: "Failed to insert data",
          },
        ],
      },
      { status: 400 }
    )
  }
}
