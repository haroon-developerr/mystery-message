import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
    _id: string;
    content: string;
    createdAt: Date
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    VerifyCode: string;
    VerifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "User Name Is Required"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email Is Required"],
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please use a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password Is Required"],
    },
    VerifyCode: {
        type: String,
        required: [true, "Verify Code Is Required"],
    },
    VerifyCodeExpiry: {
        type: Date,
        required: [true, "Verify Code Expiry Is Required"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true,
    },
    messages: [MessageSchema]

})


const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default UserModel