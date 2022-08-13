import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import { RootState, AppDispatch } from "../store/store";
import authSlice, { authActions, verify } from "../features/auth/auth-slice";

const VerificationPage = () => {
	const { user, loading, error } = useSelector(
		(state: RootState) => state.auth
	);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const params = useParams();

	useEffect(() => {
		if (!user) {
			dispatch(verify(params.token as string));
		}
	}, []);

	const clickHandler = (evt: React.MouseEvent<HTMLElement>) => {
		evt.preventDefault();
		dispatch(authActions.resetState());
		navigate("/", { replace: true });
	};

	const output = loading ? (
		<p>Verifying...</p>
	) : error ? (
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth="1.5"
				stroke="red"
				className="w-24 h-24 mx-auto"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>

			<h1 className="text-3xl font-bold text-center text-gray-900 p-2">
				Activation Failed
			</h1>
			<p className="mb-8">{error}</p>
			<Button type="button" onClick={clickHandler}>
				Go Home
			</Button>
		</div>
	) : (
		<div>
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
				Account Activated
			</h1>
			<p className="mb-8">Thank you, your email has been verified.</p>
			<Button type="button" onClick={clickHandler}>
				Go Home
			</Button>
		</div>
	);

	return (
		<div className="flex flex-col min-h-screen justify-center">
			<div className="container max-w-lg mx-auto px-10 py-8 text-gray-500 bg-white rounded-lg">
				<header className="mb-6 text-center">{output}</header>
			</div>
		</div>
	);
};

export default VerificationPage;
