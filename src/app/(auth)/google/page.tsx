import dynamic from 'next/dynamic';

const GoogleAuthClient = dynamic(() => import('@/components/forms/google-auth-client'), { 
  ssr: false 
});

const GooglePage = async () => {
  return (
    <div>
      <GoogleAuthClient />
    </div>
  );
}

export default GooglePage;
