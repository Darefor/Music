import mongoose from "mongoose"

const biografSchema = new mongoose.Schema({
    image: {type: String},
    title: {type: String, required: true},
    music: {type: [String]},
    album: {type: [mongoose.SchemaTypes.ObjectId], ref: "Album"},
    description: {type: String, require: true},
    coment: {type: String}
}
)

const Biograf = mongoose.models.Biograf || mongoose.model("Biograf", biografSchema)
export default Biograf