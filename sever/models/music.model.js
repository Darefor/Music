import mongoose from "mongoose"

const musicSchema = new mongoose.Schema({
    title: {type: String, required: true},
    // name: {type: String, required: true},
    link: {type: String, required: true},
    // album: {type: [mongoose.SchemaTypes.ObjectId], ref: "Album"},
    // playlist: {type: [mongoose.SchemaTypes.ObjectId], ref: "Album"},
    // rating: {type: Number, required: true}
}
)

const Music = mongoose.models.Music || mongoose.model("Music", musicSchema)
export default Music