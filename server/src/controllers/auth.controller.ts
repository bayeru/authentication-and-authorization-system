import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import HttpError from "../util/HttpError";
import { validateLoginInput, validateSignupInput } from "../validations/Validations";
import User from "../models/user.model";
import jwt from "jsonwebtoken";

const login = async (req: Request, res: Response, next: NextFunction) => {
	const result = validateLoginInput(req.body);

	if (result.error) {
		return next(new HttpError(result.error.details[0].message, 422));
	}

	const { email, password } = req.body;
	let existingUser;

	try {
		existingUser = await User.findOne({ email });
	} catch (error) {
		return next(new HttpError("Cannot login, please try again later.", 500));
	}

	if (!existingUser) {
		return next(new HttpError("Login failed: wrong credentials.", 401));
	}

	const isPasswordValid = await bcrypt.compare(password, existingUser.password);

	if (!isPasswordValid) {
		return next(new HttpError("Login failed: wrong credentials.", 401));
	}

	let token;

	try {
		token = jwt.sign({ id: existingUser.id }, "jwt123", { expiresIn: "1h" });
	} catch (err) {
		return next(new HttpError("Cannot login, please try again.", 500));
	}

	res.status(200).json({
		id: existingUser.id,
		email: existingUser.email,
		token: token,
	});
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

	// let token;

	// try {
	// 	token = jwt.sign(
	// 		{ id: newUser.id },
	// 		"jwt123",
	// 		{ expiresIn: "1h" }
	// 	);
	// } catch (err) {
	// 	return next(new HttpError("Signing up failed, please try again.", 500));
	// }
	
	res.status(201).json({
		id: newUser.id,
		email: newUser.email,
		//token: token
	});

};

export { login, signup };
