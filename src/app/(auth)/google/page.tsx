import dynamic from 'next/dynamic';

const GoogleAuthClient = dynamic(() => import('@/src/components/forms/GoogleAuthClient'), { 
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
