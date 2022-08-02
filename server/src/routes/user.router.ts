import express from "express";
import { Request, Response } from "express";
import { getUser, signup } from "../controllers/user.controller";

const router = express.Router();

router.get("/:id", getUser);
router.post("/signup", signup);

export {
	router as userRouter
};