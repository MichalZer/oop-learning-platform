import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
    topicId:{type : mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true},
    title: {type: String, },
    content :{type: String},
    order:{type:Number}});
    export default mongoose.model("Lesson",lessonSchema);