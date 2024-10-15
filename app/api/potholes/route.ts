import { NextResponse } from "next/server"
import { getServiceSupabase } from "@/app/supabase"

const PAGE_SIZE = 1000

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const page = Number(searchParams.get("page"))

  if (page == null) {
    return NextResponse.json(
      {
        errors: [
          {
            message: "Missing page query parameter",
          },
        ],
      },
      { status: 400 }
    )
  }

  if (isNaN(page)) {
    return NextResponse.json(
      {
        errors: [
          {
            message: "page query parameter must be a number",
          },
        ],
      },
      { status: 400 }
    )
  }

  const rangeStart = (page - 1) * PAGE_SIZE
  const rangeEnd = page * PAGE_SIZE - 1

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

  const {
    data: fetchedReportedPotholesData,
    error: fetchedReportedPotholesError,
    status,
  } = await supabase
    .from("reported_potholes")
    .select("*")
    .range(rangeStart, rangeEnd)

  if (status == 200) {
    return NextResponse.json(fetchedReportedPotholesData)
  } else {
    return NextResponse.json(
      {
        errors: [
          {
            message: "Failed to fetch reported potholes",
          },
        ],
      },
      { status: 500 }
    )
  }
}

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
