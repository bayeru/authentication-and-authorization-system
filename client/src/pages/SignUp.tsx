import React from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/api";
import Button from "../components/Button";
import Input from "../components/Input";
import useForm from "../hooks/useForm";

const SignUp = () => {

	const navigate = useNavigate();
	const [formState, changeHandler] = useForm({
		inputs: {
			name: {
				value: "",
				isValid: false,
			},
			email: {
				value: "",
				isValid: false,
			},
			password: {
				value: "",
				isValid: false,
			},
		},

		isValid: false,
	});
	const [isLoading, setIsLoading] = React.useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		const data = await signup({
			name: formState.inputs.name.value,
			email: formState.inputs.email.value,
			password: formState.inputs.password.value
		});

		console.log(data);

		if (!data) {
			setIsLoading(false);
			return;
		} else {
			navigate("/signup/message", { replace: true });
		}

	};

	return (
		<div className="flex flex-col min-h-screen justify-center">
			<div className="container max-w-lg mx-auto px-10 py-8 text-gray-500 bg-white rounded-lg">
				<header className="mb-6">
					<h1 className="text-3xl font-bold text-center text-gray-900 p-6">
						SIGN UP
					</h1>
				</header>

				<form className="mb-5" onSubmit={handleSubmit}>
					<Input
						name="email"
						type="email"
						placeholder="Email"
						value={formState.inputs.email.value}
						validator={{ required: true, email: true }}
						errorMessage="Please enter a valid e-mail."
						onChange={changeHandler}
					/>
					<Input
						name="name"
						placeholder="Name"
						value={formState.inputs.name.value}
						validator={{ required: true }}
						errorMessage="Please enter a valid name."
						onChange={changeHandler}
					/>
					<Input
						name="password"
						type="password"
						placeholder="Password"
						value={formState.inputs.password.value}
						validator={{ required: true, minLength: 4, maxLength: 40 }}
						errorMessage="Your password must contain between 4 and 40 characters."
						onChange={changeHandler}
					/>
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
						<Button disabled={isLoading} fullWidth={true}>{isLoading ? "Loading..." : "Sign Up"}</Button>
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
