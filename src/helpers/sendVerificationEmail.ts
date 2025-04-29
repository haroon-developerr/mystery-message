import { resend } from '@/lib/resend'
import VerificationEmail from '../../emails/VerificationEmail'
import { ApiResponse } from '@/types/ApiResponse'

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string,

): Promise<ApiResponse> {
    try {

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Verification Code',
            react: VerificationEmail({ username, otp: verifyCode }),
        });


        return { success: true, message: "Verification email sent!" }
    } catch (error) {
        console.log(error + "error sending verification email")
        return { success: false, message: "Failed To send verification email" }
    }
}
