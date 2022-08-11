import express from "express";
import { Request, Response } from "express";
import { getUser, getUserProfile } from "../controllers/user.controller";
import auth from "../middleware/auth";

const router = express.Router();

//router.get("/:id", auth, getUser);
router.get("/profile", auth, getUserProfile);

export {
	router as userRouter
};