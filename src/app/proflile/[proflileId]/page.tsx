import { NoResult } from "@/components/global/no-results";

export default async function UserProfilePage({ params }: { params: { proflileId: string } }) {
    const ProfileId = await params.proflileId
  return (
        <div className="flex flex-col items-center justify-center min-h-screen">
           <NoResult message={"It will be added soon."} backTo={"/"} linkName={"back To Home"}/>
           <p className="mt-5">{ProfileId}</p>
        </div>
  )
}

