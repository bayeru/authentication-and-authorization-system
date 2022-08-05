import { Request, Response, NextFunction } from "express";
import HttpError from "../util/HttpError";
import { validateLoginInput } from "../validations/Validations";
import User from "../models/user.model";

const login = async (req: Request, res: Response, next:NextFunction) => {	

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

	if (!existingUser || existingUser.password !== password) {

		return next(new HttpError("Login failed: wrong credentials.", 401));

	}

	res.status(200).json({message: "Login successful!"});

};

export {

	login

};