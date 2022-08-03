import { Request, Response, NextFunction } from "express";
import HttpError from "../util/HttpError";
import { validateSignupInput } from "../validations/Validations";

export const FAKE_USERS = [

	{
		id: 1,
		name: "John Doe",
		email: "johndoe@xmail.com",
		password: "123456"
	},

	{
		id: 2,
		name: "Jane Doe",
		email: "janedoe@xmail.com",
		password: "123456"
	}

];

const getUser = (req: Request, res: Response) => {

	const user = FAKE_USERS.find(user => user.id === +req.params.id);

	if (user) {
		res.status(200).json(user);
	} else {
		res.status(404).json({ message: "User not found!" });
	}

};

const signup = (req: Request, res: Response, next: NextFunction) => {

	const result = validateSignupInput(req.body);
	
	if (result.error) {
		
		return next(new HttpError(result.error.details[0].message, 422));
		
	}
	
	let { name, email, password } = req.body;
	const user = FAKE_USERS.find(user => user.email === email);

	if (user) {

		return next(new HttpError("Email already exists.", 409));

	}

	const newUser = {

		id: FAKE_USERS.length + 1,
		name,
		email,
		password

	};

	FAKE_USERS.push(newUser);
	res.status(201).json(newUser);

};


export {

	getUser,
	signup

};