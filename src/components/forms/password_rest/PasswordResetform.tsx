"use client";

import { FormGenerator } from "@/components/global/form-generator";
import { Loader } from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { useResetPassword } from "@/hooks/auth";
import { useModal } from "@/hooks/use-modal-store";


const PasswordResetForm = () => {
  const { register, errors, onResetPassword, isLoading } = useResetPassword();
  const { onOpen } = useModal();

  return (
   <form className="flex flex-col gap-3 mt-10" onSubmit={onResetPassword}>
      <FormGenerator
        register={register}
        errors={errors}
        type={"email"}
        inputType={"input"}
        placeholder={"Enter your email"}
        name={"email"}
        disabled={isLoading} />
      <Button type="submit" className="rounded-2xl" variant={"outline"}>
        <Loader loading={isLoading}>Send Reset Link</Loader>
      </Button>
    </form>
  );
};

export default PasswordResetForm;
