import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const SignupMessage = () => {

	const navigate = useNavigate();

	const clickHandler = (evt:React.MouseEvent<HTMLElement>) => {

		evt.preventDefault();
		navigate("/", { replace: true });

	};

	return (
		<div className="flex flex-col min-h-screen justify-center">
			<div className="container max-w-lg mx-auto px-10 py-8 text-gray-500 bg-white rounded-lg">
				<header className="mb-6 text-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="green"
						className="w-24 h-24 mx-auto"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M14.563 9.75a12.014 12.014 0 00-3.427 5.136L9 12.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>

					<h1 className="text-3xl font-bold text-center text-gray-900 p-2">
						Thank you for signing up!
					</h1>
					<p className="mb-8">We've sent you an email to confirm your membership.</p>
					<Button type="button" onClick={clickHandler}>Go Home</Button>
				</header>
			</div>
		</div>
	);
};

export default SignupMessage;
