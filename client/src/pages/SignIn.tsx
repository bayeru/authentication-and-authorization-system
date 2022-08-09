import React from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import useForm from "../hooks/useForm";
import { getUserProfile, login } from "../api/api";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/AuthContext";


const SignIn = () => {
	const context = React.useContext(AuthContext);
	const navigate = useNavigate();

	const [formState, changeHandler] = useForm({
		inputs: {
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
	const [error, setError] = React.useState("");

	console.log("SignIn", context);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		const result = await login({
			email: formState.inputs.email.value,
			password: formState.inputs.password.value,
		});

		if (result instanceof Error) {
			setIsLoading(false);
			setError(result.message);
		} else {
			context.login(result.id, result.token);
			//navigate("/", { replace: true });

			getUserProfile(result.token).then((user) => {
				console.log("user", user);
				navigate("/", { replace: true });
			});

		}
	};

	return (
		<div className="flex flex-col min-h-screen justify-center">
			<div className="container max-w-lg mx-auto px-10 py-8 text-gray-500 bg-white rounded-lg">
				<header className="mb-6">
					<h1 className="text-3xl font-bold text-center text-gray-900 p-6">
						SIGN IN
					</h1>
				</header>

				{error && (
					<div className="p-5 bg-red-100 text-red-800 rounded-lg mb-6 font-medium">{error}</div>
				)}

				<form className="mb-5" onSubmit={handleSubmit}>
					<Input
						name="email"
						type="email"
						placeholder="Email"
						validator={{ required: true, email: true }}
						errorMessage="Please enter a valid email."
						onChange={changeHandler}
					/>
					<Input
						name="password"
						type="password"
						placeholder="Password"
						validator={{ required: true, minLength: 5, maxLength: 40 }}
						errorMessage="Your password must contain between 5 and 40 characters."
						onChange={changeHandler}
					/>
					<div className="flex items-center mb-5 text-sm">
						<a
							href="#"
							className="font-medium text-indigo-600 hover:text-indigo-500"
						>
							Forgot Password?
						</a>
					</div>
					<div className="mb-5">
						<Button disabled={isLoading} fullWidth={true}>
							{isLoading ? "Loading..." : "Sign In"}
						</Button>
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
