import { CustomRequest } from './../middleware/auth';
import { Request, Response, NextFunction } from "express";
import HttpError from "../util/HttpError";
import { validateSignupInput } from "../validations/Validations";
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

const signup = async (req: Request, res: Response, next: NextFunction) => {
	
	const result = validateSignupInput(req.body);

	if (result.error) {
		return next(new HttpError(result.error.details[0].message, 422));
	}

	let { name, email, password } = req.body;
	let existingUser;

	try {
		existingUser = await User.findOne({ email });

		if (existingUser) {
			return next(new HttpError("Email already exists.", 409));
		}
	} catch (err) {
		return next(
			new HttpError("Cannot register new user, please try again later.", 500)
		);
	}

	const hashedPassword = await bcrypt.hash(password, 12);

	const newUser = new User({
		name,
		email,
		password: hashedPassword,
	});

	try {
		await newUser.save();
	} catch (err) {
		return next(new HttpError("Creating user failed, please try again.", 500));
	}

	let token;

	try {
		token = jwt.sign(
			{ id: newUser.id },
			"jwt123",
			{ expiresIn: "1h" }
		);
	} catch (err) {
		return next(new HttpError("Signing up failed, please try again.", 500));
	}
	
	res.status(201).json({
		id: newUser.id,
		email: newUser.email,
		token: token
	});

};

export { getUser, getUserProfile, signup };
