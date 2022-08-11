import { CustomRequest } from './../middleware/auth';
import { Request, Response, NextFunction } from "express";
import HttpError from "../util/HttpError";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const getUser = async (req: Request, res: Response, next: NextFunction) => {

	let user;

	try {
		user = await User.findById(req.params.id);
	} catch (err) {
		return next(
			new HttpError("Something went wrong. Could not find user.", 500)
		);
	}

	if (user) {
		res.status(200).json(user.toObject({ getters: true }));
	} else {
		res.status(404).json({ message: "User not found!" });
	}
};

const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
	let user;

	try {
		user = await User.findById((req as CustomRequest).token.id).select("-password");
	} catch (err) {
		return next(
			new HttpError("Something went wrong. Could not find user.", 500)
		);
	}

	if (user) {
		res.status(200).json(user.toObject({ getters: true }));
	} else {
		res.status(404).json({ message: "User not found!" });
	}
};

export { getUser, getUserProfile };
