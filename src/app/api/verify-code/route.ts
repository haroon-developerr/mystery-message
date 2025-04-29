import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

export async function POST(request: Request) {
    await dbConnect()

    try {
        const { username, code } = await request.json()

        const decodedUsername = decodeURIComponent(username)
        const user = await UserModel.findOne({ username: decodedUsername })

        if (!user) {
            return Response.json({
                message: "User not found",
                success: false
            }, { status: 400 })
        }

        const isCodeValid = user.VerifyCode === code
        const isCodeExpired = new Date(user.VerifyCodeExpiry) > new Date()

        if (isCodeValid && isCodeExpired) {
            user.isVerified = true
            await user.save()

            return Response.json({
                message: "User Verified",
                success: true
            }, { status: 201 })
        } else if (!isCodeValid) {
            return Response.json({
                message: "Code Incorrect",
                success: false
            }, { status: 400 })
        } else {
            return Response.json({
                message: "Code Expired",
                success: false
            }, { status: 400 })

        }

    } catch (error: any) {
        console.log("Error Verifying User" + error.message)
        return Response.json({
            message: "Error Verifying User",
            success: false
        }, { status: 500 })

    }
}