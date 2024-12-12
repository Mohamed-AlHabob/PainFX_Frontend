import LandingPageNavbar from "@/features/landing/components/navbar"

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] container relative items-center justify-items-center min-h-screen p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]"> 
    <LandingPageNavbar  />
      {children}
    </div>
  )
}

export default LandingPageLayout
