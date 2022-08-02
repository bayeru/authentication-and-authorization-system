import { Request, Response } from "express";
import HttpError from "../util/HttpError";
import { FAKE_USERS } from "./user.controller";

const login = (req: Request, res: Response) => {

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