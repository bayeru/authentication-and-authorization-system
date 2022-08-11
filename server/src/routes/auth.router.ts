import express from "express";
import { Request, Response } from "express";
import { login, signup } from "../controllers/auth.controller";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);

export {
	router as authRouter
};