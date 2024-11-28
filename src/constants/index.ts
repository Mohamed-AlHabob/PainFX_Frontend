import { FormProps, SIGN_IN_FORM, SIGN_UP_FORM,REST_PASSWORD_FORM, DOCUMENT_FORM } from "./forms"
import {
  LANDING_PAGE_MENU,
  MODE_TOGGLE_MENU,
  MenuProps,
} from "./menus"

import {
  CREATE_AUTHEN_PLACEHOLDER,
  CreateAuthenPlaceholderProps,
} from "./placeholder"
import { REASONS_LIST, ReasonsListProps } from "./slider"

type AuthenConstantsProps = {
  landingPageMenu: MenuProps[]
  modetoggle: MenuProps[]
  signUpForm: FormProps[]
  signInForm: FormProps[]
  documentForm: FormProps[]
  resetPassword: FormProps[]
  reasonsList: ReasonsListProps[]
  createQistatPlaceholder: CreateAuthenPlaceholderProps[]
  
}

export const QISTAT_CONSTANTS: AuthenConstantsProps = {
  resetPassword:REST_PASSWORD_FORM,
  landingPageMenu: LANDING_PAGE_MENU,
  modetoggle: MODE_TOGGLE_MENU,
  signUpForm: SIGN_UP_FORM,
  signInForm: SIGN_IN_FORM,
  documentForm: DOCUMENT_FORM,
  reasonsList: REASONS_LIST,
  createQistatPlaceholder: CREATE_AUTHEN_PLACEHOLDER,

}
