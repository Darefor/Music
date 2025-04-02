import mongoose from "mongoose"

const userShema = new mongoose.Schema({
    username: {type: String, unique:true, required: true},
    password: {type: String, required: true},
})

const User = mongoose.model.User || mongoose.model("User", userShema)

export default User