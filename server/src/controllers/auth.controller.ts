import { Request, Response, NextFunction } from "express";
import HttpError from "../util/HttpError";
import { FAKE_USERS } from "./user.controller";
import { validateLoginInput } from "../validations/Validations";

const login = (req: Request, res: Response, next:NextFunction) => {

	const result = validateLoginInput(req.body);

	if (result.error) {

		return next(new HttpError(result.error.details[0].message, 422));

	}

	const { email, password } = req.body;
	const user = FAKE_USERS.find(user => user.email === email);

	if (!user || user.password !== password) {

		throw new HttpError("Login failed: wrong credentials.", 401);

	} else {

		res.status(200).json({message: "Login successful!"});

	}


};

export {

	login

};