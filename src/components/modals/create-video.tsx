"use client"
import { GlassModal } from "../global/glass-modal"
import { useModal } from "@/hooks/use-modal-store"
import { useRouter } from "next/navigation"
import { FormGenerator } from "../global/form-generator"
import { useCreateDocument } from "@/hooks/Document"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { ErrorMessage } from "@hookform/error-message"
import { BadgePlus } from "../icons/badge-plus"


const DeleteDocumentModal = () => {
  const { onClose } = useModal();
  const router = useRouter();
  const { onCreateDocument, isPending, register, errors } = useCreateDocument();
 
  const onClick = async () => {
    try {
      onCreateDocument();
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
    }
  }
    return (
      <GlassModal
        title="Create a new video"
        description="Add a new form for your community"
        descriptionillustrative="This form will be available for your community"
        onClick={onClick}
        isLoading={isPending}
        modalType="deletedocument"
      >
    <form onSubmit={onCreateDocument} className="flex flex-col gap-y-3">
      <FormGenerator
        register={register}
        errors={errors}
        name="title"
        label="title"
        placeholder="Title..."
        inputType="input"
        type="text"
      />
      <FormGenerator
        register={register}
        errors={errors}
        name="caseId"
        label="caseId"
        placeholder="caseId..."
        inputType="input"
        type="text"
      />
      <Label className="" htmlFor="media-gallery">
        <p>or Upload and Image</p>
        <span className="border-[1px] border-dashed flex flex-col justify-center items-center py-10 my-2 hover:bg-themeGray/50 cursor-pointer border-themeGray  rounded-lg gap-y-2">
          <Input
            type="file"
            className="hidden"
            id="media-gallery"
            multiple
            {...register("file")}
          />
          <BadgePlus />
          <p>Drag and drop an image</p>
        </span>
        <ErrorMessage
          errors={errors}
          name={"image"}
          render={({ message }) => (
            <p className="text-red-400 mt-2">
              {message === "Required" ? "" : message}
            </p>
          )}
        />
      </Label>
    </form>
      </GlassModal>
    )
  }
export default DeleteDocumentModal
