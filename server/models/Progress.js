import mongoose from"mongoose";
import { use } from "react";

const progressSchema = new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
     lessonId:{type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
     completed:{type:Boolean, default:false},
     score :Number
});

export default mongoose.model("progress", progressSchema);
