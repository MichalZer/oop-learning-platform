import mongoose from "mongoose";

const practiceSchema = new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    language:String,
    feature: String,
    generatedCode: String,
},{timestamps:true});

export default mongoose.model("Practice", practiceSchema);