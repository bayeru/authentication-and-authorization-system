import React from "react";
import Button from "../components/Button";
import Input from "../components/Input";

const SignUp = () => {
	return (
		<div className="flex flex-col min-h-screen justify-center">
			<div className="container max-w-lg mx-auto px-10 py-8 text-gray-500 bg-white rounded-lg">
				<header className="mb-6">
					<h1 className="text-3xl font-bold text-center text-gray-900 p-6">
						SIGN UP
					</h1>
				</header>

				<form className="mb-5">
					<Input name="email" type="email" placeholder="Email" validator={{required: true, email:true}} errorMessage="Please enter a valid e-mail." />
					<Input name="name" placeholder="Name" validator={{required: true}} errorMessage="Please enter a valid name." />
					<Input name="password" type="password" placeholder="Password" validator={{required: true, minLength:4, maxLength:40 }} errorMessage="Your password must contain between 4 and 40 characters."/>
					<div className="flex items-center mb-5 text-sm">
						By proceeding, you agree to the&nbsp;
						<a
							href="#"
							className="font-medium text-indigo-600 hover:text-indigo-500"
						>
							Terms and Conditions
						</a>
					</div>
					<div className="mb-5">
						<Button fullWidth={true}>Sign Up</Button>
					</div>
					<div className="font-medium text-center text-sm">
						<span>
							Already have an account?&nbsp;
							<a href="#" className="text-indigo-600 hover:text-indigo-500">
								Log in
							</a>
						</span>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
