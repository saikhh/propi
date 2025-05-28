import express from "express";
import {getPost,getPosts,addPost,updatePost,deletePost} from "../controllers/post.controller.js"
import { verifyToken } from "../middleware/verifyToken.js";


const router = express.Router();


router.get("/:id",getPost)
router.get("/", getPosts);
router.post("/", verifyToken,addPost);
router.put("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);
export default router;
