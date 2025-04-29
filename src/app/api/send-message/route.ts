import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { messageSchema } from "@/schemas/messageSchema";
import { Message } from "@/models/User";

export async function POST(request: Request) {
    await dbConnect()
    const { username, content } = await request.json()
    try {
        const user = await UserModel.findOne({ username })
        if (!user) {
            return Response.json({
                message: "User Not Found",
                success: false
            }, { status: 404 })
        }

        if (!user.isAcceptingMessage) {
            return Response.json({
                message: "User is not accepting messages",
                success: false
            }, { status: 403 })
        }

        const newMessage = { content, createdAt: new Date() }
        user.messages.push(newMessage as Message)
        await user.save()
        return Response.json({
            message: "Message Sent Successfully",
            success: true
        }, { status: 200 })


    } catch (error: any) {
        return Response.json({
            message: error.message,
            success: false
        }, { status: 500 })

    }
}