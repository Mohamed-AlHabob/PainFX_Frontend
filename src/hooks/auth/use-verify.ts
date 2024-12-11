import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { toast } from 'sonner';
import { extractErrorMessage } from '../error-handling';
import { finishInitialLoad, setAuth } from '@/redux/services/auth/authSlice';
import { useVerifyMutation } from '@/redux/services/auth/authApiSlice';

export default function useVerify() {
  const dispatch = useAppDispatch();
  const [verify] = useVerifyMutation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let didCancel = false;

    const performVerification = async () => {
      setLoading(true);
      try {
        await verify(undefined).unwrap();
        if (!didCancel) {
          dispatch(setAuth());
          toast.success('Verification successful!');
        }
      } catch (error:any) {
        if (!didCancel) {
          const errorMessage = extractErrorMessage(error);
          // toast.error(errorMessage);
        }
      } finally {
        if (!didCancel) {
          setLoading(false);
          dispatch(finishInitialLoad());
        }
      }
    };

    performVerification();

    return () => {
      didCancel = true;
    };
  }, [dispatch, verify]);

  return { loading };
}
