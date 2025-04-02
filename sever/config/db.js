import mongoose from "mongoose"

export async function connectToDB() {
    try{
        const conn = await mongoose.connect(process.env.DB_URL)
        console.log("MongoDB connected: ", conn.connection.host)
    } catch(error){
        console.log("Error connect to DB", error.message)
        process.exit(1)
    }
}