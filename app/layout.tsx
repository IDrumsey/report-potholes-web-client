import "./globals.css"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"

export const metadata: Metadata = {
  title: "Report Potholes",
  description:
    "Centralized solution for reporting potholes quickly and easily.",
}

const poppins = Poppins({
  weight: ["500", "600", "700", "800", "900"],
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  )
}
