import continueWithSocialAuth from './continue-with-social-auth';
import { StepOneSchema, type StepOneSchemaType } from "./validators/step-one";
import { StepTwoSchema, type StepTwoSchemaType } from "./validators/step-two";
import { StepThreeSchema, type StepThreeSchemaType } from "./validators/step-three";
import { StepFourSchema, type StepFourSchemaType } from "./validators/step-four";
import { cn } from './utils';

export const continueWithGoogle = () =>
	continueWithSocialAuth('google-oauth2', 'google');
export const continueWithFacebook = () =>
	continueWithSocialAuth('facebook', 'facebook');


export {
	cn,
	StepOneSchema,
    StepOneSchemaType,
    StepTwoSchema,
    StepTwoSchemaType,
    StepThreeSchema,
    StepThreeSchemaType,
    StepFourSchema,
    StepFourSchemaType,
}