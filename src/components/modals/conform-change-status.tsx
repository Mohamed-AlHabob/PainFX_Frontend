"use client"
import { GlassModal } from "../global/glass-modal"
import { useModal } from "@/hooks/use-modal-store"
import { FormGenerator } from "../global/form-generator"
import { useUpdateCaseRequest } from "@/hooks/Case/Case-Request"


const ChangeStatusModal = () => {
  const { onClose, data } = useModal();
  const { Caserequest } = data;
  const { onUpdateCaseRequest, isPending, register, errors } = useUpdateCaseRequest("7fb00aba-f348-4ec9-afc4-796617c82612");
 
  const onClick = async () => {
    try {
      onUpdateCaseRequest();
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  return (
    <GlassModal
      title="Change Status"
      description="Make sure you choose carefully."
      descriptionillustrative="This form will be available for your community"
      onClick={onClick}
      isLoading={isPending}
      modalType="ChangeStatus"
    >
      <form className="flex flex-col gap-y-3">
        <FormGenerator
          register={register}
          errors={errors}
          name="status"
          label="status"
          placeholder="Select a status"
          inputType="select"
          options={[
            { value: "PENDING", label: "PENDING", id: "PENDING" },
            { value: "ACCEPTED", label: "ACCEPTED", id: "ACCEPTED" },
            { value: "REJECTED", label: "REJECTED", id: "REJECTED" },
          ]}
        />
        <FormGenerator
          register={register}
          errors={errors}
          name="lawyer"
          label="lawyer"
          placeholder="Select a status"
          inputType="input"

        />
        <FormGenerator
          register={register}
          errors={errors}
          name="client"
          label="client"
          placeholder="Select a status"
          inputType="input"
        />
      </form>
    </GlassModal>
  )
}
export default ChangeStatusModal
