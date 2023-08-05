import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="w-full lg:grid lg:grid-cols-2 lg:gap-4 flex flex-col gap-0 items-stretch">
        <div className="p-10 pl-20">
          <h1 className="text-left text-7xl font-bold text-[#00A3FF]">
            Report a
          </h1>
          <h1 className="pl-20 text-8xl mt-6 font-bold text-[#252525]">
            Pothole
          </h1>
        </div>
        <div className="p-4"></div>
      </div>
    </main>
  )
}
