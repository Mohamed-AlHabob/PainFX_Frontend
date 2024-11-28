
type HuddlesLayoutProps = {
  children: React.ReactNode
  params: { groupid: string }
}

const HuddlesLayout = async ({ children, params }: HuddlesLayoutProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 flex-1 h-0">

    </div>
  )
}

export default HuddlesLayout
