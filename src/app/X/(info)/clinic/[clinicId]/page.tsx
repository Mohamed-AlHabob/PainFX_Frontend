import ClinicInfoPage from "@/feature/info/clinic/components";

const UserProfilePage = async ({ params }: { params: { clinicId: string } }) => {
  const { clinicId } = await params;
return ( 
  <div className="">
    <ClinicInfoPage clinicId={clinicId} />
  </div>

  );
}
 
export default UserProfilePage;