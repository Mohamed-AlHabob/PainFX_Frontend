"use client";

import { FormGenerator } from "@/components/global/form-generator";
import { Loader } from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { QISTAT_CONSTANTS } from "@/constants";
import { useResetPassword } from "@/hooks/auth";


interface PasswordResetFormProps{
  uid: string,
  token: string
}

const PasswordResetConfirmForm = ({uid,token } : PasswordResetFormProps) => {
  const { register, errors, onResetPassword, isLoading } = useResetPassword();

  return (
    <form className="flex flex-col gap-3 mt-10" onSubmit={onResetPassword}>
      {QISTAT_CONSTANTS.resetPassword.map((field) => (
        <FormGenerator
          {...field}
          key={field.id}
          register={register}
          errors={errors}
          disabled={isLoading}
        />
      ))}
      <Button type="submit" className="rounded-2xl">
        <Loader loading={isLoading}>Save</Loader>
      </Button>
    </form>
  );
};

export default PasswordResetConfirmForm;
