'use client';

import { useSocialAuth } from "@/hooks/auth";
import { useSocialAuthenticateMutation } from "@/redux/features-slices/authApiSlice";
import { Spinner } from "../spinner";


export default function GoogleAuthClient() {
  const [googleAuthenticate] = useSocialAuthenticateMutation();
  useSocialAuth(googleAuthenticate, 'google-oauth2');

  return (
    <div className='flex justify-center items-center'>
      <Spinner />
    </div>
  );
}