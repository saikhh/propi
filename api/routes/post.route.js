import express from "express"
import { verifyToken } from "../middleware/verifyToken"

const router=express.Router() 

router.get("/",getPosts) 

router.get("/:id",getPost)
router.post("/id",verifyToken, addPost)   
router.put("/:id",verifyToken, updatePosts)  
router.delete("/id", verifyToken,deletePosts) 
export default router; 
