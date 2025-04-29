import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { z } from 'zod'
import { usernameValidation } from "@/schemas/signupSchema"

const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request) {
    await dbConnect()
    try {
        const { searchParams } = new URL(request.url)
        const queryParam = {
            username: searchParams.get('username')
        }

        const result = UsernameQuerySchema.safeParse(queryParam)

        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors || []
            return Response.json({
                message: usernameErrors.length > 0 ? usernameErrors.join(', ') : 'Inavlid query',
                success: false
            }, { status: 400 })
        }

        const { username } = result.data

        const existingVerifiedUser = await UserModel.findOne({
            username,
            isVerified: true
        })

        if (existingVerifiedUser) {
            return Response.json({
                message: 'Username is already taken',
                success: false
            }, { status: 400 })
        }

        return Response.json({
            message: 'Username is unique',
            success: true
        }, { status: 201 })


    } catch (error: any) {
        console.log("checking username" + error.message)
        return Response.json({
            message: "Error checking username",
            success: false
        }, { status: 500 })
    }

}