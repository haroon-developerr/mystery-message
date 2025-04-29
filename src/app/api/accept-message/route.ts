import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { User } from "next-auth";

export async function POST(request: Request) {
    await dbConnect()
    const session = await getServerSession(authOptions)
    const user: User = session?.user as User
    if (!session || !session.user) {
        return Response.json({
            message: "Not Authenticated",
            success: false
        }, { status: 401 })
    }

    const userId = user._id
    const { acceptMessages } = await request.json()

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(userId, {
            isAcceptingMessage: acceptMessages
        }, { new: true })

        if (!updatedUser) {
            return Response.json({
                message: "Accept Message's Failed",
                success: false
            }, { status: 401 })
        }

        return Response.json({
            message: "Message Acceptence status accepted successfully",
            success: true,
            updatedUser
        }, { status: 200 })

    } catch (error: any) {
        return Response.json({
            message: "Accept Message's Failed",
            success: false
        }, { status: 500 })

    }
}

export async function GET(request: Request) {
    await dbConnect()
    const session = await getServerSession(authOptions)
    const user: User = session?.user as User
    if (!session || !session.user) {
        return Response.json({
            message: "Not Authenticated",
            success: false
        }, { status: 401 })
    }

    const userId = user._id
    try {
        const foundUser = await UserModel.findById(userId)

        if (!foundUser) {
            return Response.json({
                message: "User Not Found",
                success: false
            }, { status: 404 })
        }

        return Response.json({
            success: true,
            isAcceptingMessage: foundUser.isAcceptingMessage
        }, { status: 200 })

    } catch (error: any) {
        return Response.json({
            message: "Error in getting message status",
            success: false
        }, { status: 500 })

    }


}