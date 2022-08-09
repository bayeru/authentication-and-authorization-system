import express from "express";
import { Request, Response } from "express";
import { login } from "../controllers/auth.controller";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/login", login);

export {
	router as authRouter
};