export type FormProps = {
  id: string
  type: "email" | "text" | "password" | "file"
  inputType: "select" | "input" | "file"
  options?: { value: string; label: string; id: string }[]
  label?: string
  placeholder: string
  name: string
}
export const SIGN_UP_FORM: FormProps[] = [
  {
    id: "1",
    inputType: "input",
    placeholder: "Email",
    name: "email",
    type: "email",
  },
  {
    id: "2",
    inputType: "input",
    placeholder: "Password",
    name: "password",
    type: "password",
  }
]

export const SIGN_IN_FORM: FormProps[] = [
  {
    id: "1",
    inputType: "input",
    placeholder: "Email",
    name: "email",
    type: "email",
  },
  {
    id: "2",
    inputType: "input",
    placeholder: "Password",
    name: "password",
    type: "password",
  },
]

export const REST_PASSWORD_FORM: FormProps[] = [
  {
    id: "1",
    inputType: "input",
    placeholder: "New Password",
    name: "new_password",
    type: "password",
  },
  {
    id: "2",
    inputType: "input",
    placeholder: "Confirm Password",
    name: "re_new_password",
    type: "password",
  },
]




export const DOCUMENT_FORM: FormProps[] = [
  {
    id: "1",
    inputType: "input",
    placeholder: "Title",
    name: "title",
    type: "text",
  },
  {
    id: "2",
    inputType: "file",
    placeholder: "file",
    name: "file",
    type: "file",
  },
]