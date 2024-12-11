import DoctorInfoPage from "@/feature/info/user/components";


const UserProfilePage = async ({ params }: { params: { userId: string } }) => {
  const { userId } = await params;
return ( 
  <div className="">
    <DoctorInfoPage userId={userId} />
  </div>

  );
}
 
export default UserProfilePage;