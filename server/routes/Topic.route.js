import express from "express"
import Topic from "../models/Topic.js";
import Lesson from "../models/Lesson.js";   

const router = express.Router();

// Get all topics with their lessons

router.get("/topics",async(req,res)=>{
    try{
        const topics = await Topic.find().sort({order:1});
        res.json(topics)
    }catch(err){
        res.status(500).json({message: err.message});
    }
});


router.get("/topics/:id",async(req,res)=>{
    try{
        const topicId= await Topic.findById(req.params.id)
        const lessons = await Lesson.find({topicId: topicId._id}).sort({order:1});
        res.json({topic: topicId, lessons: lessons});
    }catch(err){
        res.status(500).json({message: err.message});
    }
});
export default router;

