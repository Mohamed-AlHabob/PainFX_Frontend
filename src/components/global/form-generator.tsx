import { Textarea } from "@/components/ui/textarea"
import { ErrorMessage } from "@hookform/error-message"
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

type FormGeneratorProps = {
  type?: "text" | "email" | "password" | "number"
  inputType: "select" | "input" | "textarea"
  options?: { value: string; label: string; id: string }[]
  label?: string
  placeholder: string
  register?: UseFormRegister<any>
  name: string
  errors: FieldErrors<FieldValues>
  lines?: number
  disabled?:boolean,
}

export const FormGenerator = ({
  inputType,
  options,
  label,
  placeholder,
  register,
  name,
  errors,
  type,
  lines,
  disabled,
}: FormGeneratorProps) => {
  const renderErrorMessage = (name: string) => (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => (
        <p className="text-red-400 mt-2">
          {message === "Required" ? "" : message}
        </p>
      )}
    />
  );

  switch (inputType) {
    case "input":
      return (
        <Label className="flex flex-col gap-2" htmlFor={`input-${name}`}>
          {label && <span>{label}</span>}
          <Input
            id={`input-${name}`}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            {...(register && register(name))}
          />
          {renderErrorMessage(name)}
        </Label>
      );

    case "select":
      return (
        <Label htmlFor={`select-${name}`} className="flex flex-col gap-2">
          {label && <span>{label}</span>}
          <select
            id={`select-${name}`}
            disabled={disabled}
            className="w-full bg-transparent border-[1px] p-3 rounded-lg"
            {...(register && register(name))}
          >
            {options?.map((option) => (
              <option
                value={option.value}
                key={option.id}
                className="dark:bg-muted"
              >
                {option.label}
              </option>
            ))}
          </select>
          {renderErrorMessage(name)}
        </Label>
      );

    case "textarea":
      return (
        <Label className="flex flex-col gap-2" htmlFor={`textarea-${name}`}>
          {label && <span>{label}</span>}
          <Textarea
            id={`textarea-${name}`}
            disabled={disabled}
            placeholder={placeholder}
            {...(register && register(name))}
            rows={lines}
          />
          {renderErrorMessage(name)}
        </Label>
      );

    default:
      return null;
  }
}
