
import PasswordResetConfirmForm from '@/src/components/forms/password_rest/PasswordResetformConfirm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Full Auth | Password Reset Confirm',
	description: 'Full Auth password reset confirm page',
};

interface Props {
	params: {
		uid: string;
		token: string;
	};
}

export default function ResetPasswordPage({ params: { uid, token } }: Props) {
	return (
		<>
		<h5 className="font-bold text-base text-themeTextWhite">Login</h5>
		<p className="text-themeTextGray leading-tight">
		Protect yourself from misinformation with advanced video verification.
		</p>
		<PasswordResetConfirmForm uid={uid} token={token} />
		</>
	);
}
