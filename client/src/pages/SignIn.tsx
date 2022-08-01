import React from "react";
import Button from "../components/Button";
import Input from "../components/Input";

const SignIn = () => {
	return (
		<div className="flex flex-col min-h-screen justify-center">
			<div className="container max-w-lg mx-auto px-10 py-8 text-gray-500 bg-white rounded-lg">
				<header className="mb-6">
					<h1 className="text-3xl font-bold text-center text-gray-900 p-6">
						SIGN IN
					</h1>
				</header>

				<form className="mb-5">
					<Input placeholder="Username" validator={{required: true}} errorMessage="Please enter a valid username." />
					<Input type="password" placeholder="Password" validator={{required: true, minLength:4, maxLength:20}} errorMessage="Your password must contain between 4 and 20 characters."/>
					<div className="flex items-center mb-5 text-sm">
						<a
							href="#"
							className="font-medium text-indigo-600 hover:text-indigo-500"
						>
							Forgot Password?
						</a>
					</div>
					<div className="mb-5">
						<Button>Sign In</Button>
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
