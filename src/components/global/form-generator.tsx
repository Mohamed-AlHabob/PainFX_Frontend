import React from "react";
import { Controller, UseFormRegister, FieldErrors, FieldValues, Control, RegisterOptions } from "react-hook-form";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";


type FormGeneratorProps = {
  name: string;
  label?: string;
  type?: "text" | "email" | "textarea" | "password" | "number" | "date" | "select";
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  register?: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  control?: Control<FieldValues>;
  defaultValue?: unknown;
  rules?: RegisterOptions<FieldValues>;
  options?: { value: string; label: string }[];
};
const FormGenerator: React.FC<FormGeneratorProps> = ({
  name,
  label,
  type = "text",
  placeholder,
  disabled,
  rows,
  register,
  errors,
  control,
  defaultValue,
  rules,
  options,
}) => {

  const renderErrorMessage = (name: string) => {
    return errors[name] ? (
      <span className="text-red-500 text-sm">{errors[name].message}</span>
    ) : null;
  };

  const isTextArea = type === "textarea";
  const isSelect = type === "select";

  return (
    <>
      {isTextArea ? (
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          rules={rules}
          render={({ field }) => (
            <Label className="flex flex-col gap-2" htmlFor={`textarea-${name}`}>
              {label && <span>{label}</span>}
              <Textarea
                id={`textarea-${name}`}
                placeholder={placeholder}
                disabled={disabled}
                rows={rows}
                {...field}
              />
              {renderErrorMessage(name)}
            </Label>
          )}
        />
      ) : isSelect ? (
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          rules={rules}
          render={({ field }) => (
            <Label className="flex flex-col gap-2" htmlFor={`select-${name}`}>
              {label && <span>{label}</span>}
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {renderErrorMessage(name)}
            </Label>
          )}
        />
      ) : (
        <Label className="flex flex-col gap-3" htmlFor={`input-${name}`}>
          {label && <span>{label}</span>}
          <Input
            id={`input-${name}`}
            type={type === "date" ? "date" : type}
            placeholder={type === "date" ? "YYYY-MM-DD" : placeholder}
            disabled={disabled}
            {...(register && register(name))}
          />
          {renderErrorMessage(name)}
        </Label>
      )}
    </>
  );
};

export default FormGenerator;

