import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import HttpError from "../util/HttpError";
import { validateLoginInput } from "../validations/Validations";
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

export { login };
