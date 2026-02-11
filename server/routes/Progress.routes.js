import exprress from "express";
import Progress from "../models/progress.js";
import auth from "../middlewares/auth.js";

const router=exprress.Router();

// Get progress for a specific user
router.get("/progress", auth, async(req,res)=>{
    try{
        const userId = req.user.userId;
        const progress = await Progress.find({userId: userId});
        res.json(progress);
    }catch(err){
        res.status(500).json({message: err.message});
    }   
})

export default router;