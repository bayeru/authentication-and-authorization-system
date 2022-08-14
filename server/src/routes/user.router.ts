import express from "express";
import { Request, Response } from "express";
import { getUser, getUserProfile, updateUserProfile } from "../controllers/user.controller";
import auth from "../middleware/auth";

const router = express.Router();

//router.get("/:id", auth, getUser);
router.get("/profile", auth, getUserProfile);
router.put("/profile", auth, updateUserProfile);

export {
	router as userRouter
};