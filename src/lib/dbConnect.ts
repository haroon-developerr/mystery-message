import mongoose from 'mongoose'

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Already Connected To Data Base")
        return
    }

    try {   
        // process.env.MONGODB_URI
        const db = await mongoose.connect('mongodb+srv://hharoon5166:qui0W2FUHgn9DGpA@cluster0.vhwy9oz.mongodb.net/' || '')

        connection.isConnected = db.connections[0].readyState

    } catch (error) {
        console.log("Database failed + ", error)
        process.exit(1)
    }
}

export default dbConnect



