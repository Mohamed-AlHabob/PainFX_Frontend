import { NavBar } from '@/feature/control/components/nav-bar'
import { SubNav } from '@/feature/control/components/sub-nav'
import { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="sticky top-0 z-30 h-fit">
      <SubNav />
      </div>
      {children}
    </div>
  )
}

