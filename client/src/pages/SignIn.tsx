import React from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import useForm from "../hooks/useForm";

const SignIn = () => {

	const [formState, changeHandler] = useForm({
		inputs: {
			username: {
				value: "",
				isValid: false
			},
			password: {
				value: "",
				isValid: false
			}
		},
		isValid: false
	});

	console.log(formState);

	return (
		<div className="flex flex-col min-h-screen justify-center">
			<div className="container max-w-lg mx-auto px-10 py-8 text-gray-500 bg-white rounded-lg">
				<header className="mb-6">
					<h1 className="text-3xl font-bold text-center text-gray-900 p-6">
						SIGN IN
					</h1>
				</header>

				<form className="mb-5">
					<Input name="username" placeholder="Username" validator={{required: true}} errorMessage="Please enter a valid username." onChange={changeHandler} />
					<Input name="password" type="password" placeholder="Password" validator={{required: true, minLength:4, maxLength:40}} errorMessage="Your password must contain between 4 and 40 characters." onChange={changeHandler} />
					<div className="flex items-center mb-5 text-sm">
						<a
							href="#"
							className="font-medium text-indigo-600 hover:text-indigo-500"
						>
							Forgot Password?
						</a>
					</div>
					<div className="mb-5">
						<Button fullWidth={true}>Sign In</Button>
					</div>
					<div className="font-medium text-center text-sm">
						<span>
							Don't have an account?&nbsp;
							<a href="#" className="text-indigo-600 hover:text-indigo-500">
								Sign Up
							</a>
						</span>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignIn;
