import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function DELETE(request: Request, { params }: { params: { messageid: string } }) {
    const messageId = params.messageid
    await dbConnect()
    const session = await getServerSession(authOptions)
    const user: User = session?.user as User
    if (!session || !session.user) {
        return Response.json({
            message: "Not Authenticated",
            success: false
        }, { status: 401 })
    }

    try {
        const updatedResult = await UserModel.updateOne(
            { _id: user._id },
            { $pull: { messages: { _id: messageId } } }
        )

        if (updatedResult.modifiedCount === 0) {
            return Response.json({
                message: "Already Deleted",
                success: false
            }, { status: 404 })
        }

        return Response.json({
            message: "Message Deleted",
            success: true
        }, { status: 201 })


    } catch (error) {
        return Response.json({
            message: "Error Deleted Message",
            success: false
        }, { status: 500 })

    }
}