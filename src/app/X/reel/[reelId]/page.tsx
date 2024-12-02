import { ReelsFeed } from "@/feature/qstit/components/reel-feed";

export default function Home() {



  return (
    <main className="flex flex-col items-center justify-center  overflow-hidden">
      <div className="w-full max-w-[700px] h-full max-h-[700px] md:h-[80vh] lg:h-[90vh] p-4">
        <ReelsFeed />
      </div>
    </main>
  )
}

