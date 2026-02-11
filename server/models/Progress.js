import mongoose from"mongoose";
import User from "./User.js";

const progressSchema = new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
     lessonId:{type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
     completed:{type:Boolean, default:false},
     score :Number
});

export default mongoose.model("progress", progressSchema);
