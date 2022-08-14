import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { Modal } from "../components/Modal";
import useForm from "../hooks/useForm";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { authActions } from "../features/auth/auth-slice";
import { getUserDetails, updateUserDetails, userActions } from "../features/user/user-slice";
import { AppDispatch } from "../store/store";

const Profile = () => {
	// Get auth state from redux store
	const { authUser, error: authError } = useSelector((state: RootState) => state.auth);

	// Get user state from redux store
	const {
		userDetails,
		loading: userDetailsLoading,
		error: userDetailsError,
		message: userDetailsMessage,
	} = useSelector((state: RootState) => state.user);

	const dispatch = useDispatch<AppDispatch>();

	// Use a custom hook to manage form state
	const [formState, changeHandler, setData] = useForm({
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
			createdAt: {
				value: "",
				isValid: false,
			},
		},
		isValid: false,
	});

	useEffect(() => {
		// If the user details are not loaded, request them from the server
		if (authUser !== null && !userDetails) {
			dispatch(getUserDetails(authUser.token));
		}

		// If the user details are loaded, set the form data
		if (authUser !== null && userDetails) {
			setData({
				inputs: {
					name: {
						value: userDetails.name,
						isValid: true,
					},
					email: {
						value: userDetails.email,
						isValid: true,
					},
					password: {
						value: "",
						isValid: false,
					},
					createdAt: {
						value: userDetails.createdAt || "",
						isValid: true,
					},
				},
				isValid: true,
			});
		}
	}, [userDetails, authUser, setData, dispatch]);

	// Reset state if the component is unmounted
	useEffect(() => {
		return () => {
			dispatch(userActions.resetState());
		};
	}, []);

	const logoutHandler = async () => {
		dispatch(authActions.logout());
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Clear the previous error and message before submitting
		dispatch(userActions.clearError());
		dispatch(userActions.clearMessage());

		// Send the updated user details to the server
		dispatch(
			updateUserDetails({
				id: userDetails?.id,
				name: formState.inputs.name.value,
				email: formState.inputs.email.value,
				password: formState.inputs.password.value,
				token: authUser?.token || "",
			})
		);
	};

	// Reformat the date to a more readable format
	const formattedDate = new Date(formState.inputs.createdAt.value).toLocaleDateString();

	return (
		<>
		<Modal />
		<div className="flex flex-col h-full">
			<div className="flex justify-between items-center w-full px-8 py-4 bg-white border-b shadow">
				<div>
					<Link to="/">
						<img className="w-10 h-10" src="images/logo.svg" alt="" />
					</Link>
				</div>
				<nav className="flex space-x-7">
					<Link to="/">Home</Link>
					<Link to="/" onClick={logoutHandler}>
						Logout
					</Link>
				</nav>
			</div>
			<div className="grid grid-cols-3 gap-6 p-8 mt-10">
				<div className="col-span-1">
					<div className="px-4">
						<h3 className="text-lg font-medium text-gray-900">Your Profile</h3>
						<p className="mt-1 text-sm text-gray-600">
							Here you can manage your profile settings and change the password, email or website.
						</p>
					</div>
				</div>

				<div className="col-span-2 ">
					<form className="text-gray-500" onSubmit={handleSubmit}>
						<div className="bg-white shadow rounded-lg">
							<div className="px-10 py-8">
								{/* If there is an error or message, display it */}
								{userDetailsMessage && (
									<div className="p-5 bg-green-100 text-green-800 rounded-lg mb-6">
										{userDetailsMessage}
									</div>
								)}
								{userDetailsError && (
									<div className="p-5 bg-red-100 text-red-800 rounded-lg mb-6">
										{userDetailsError}
									</div>
								)}
								<Input
									name="name"
									label="Name"
									initialValue={formState.inputs.name.value}
									validator={{ required: true }}
									errorMessage="Please enter a valid name."
									onChange={changeHandler}
								/>
								<Input
									name="email"
									label="Email"
									initialValue={formState.inputs.email.value}
									validator={{ required: true, email: true }}
									errorMessage="Please enter a valid email."
									onChange={changeHandler}
								/>
								<Input name="password" label="Password" type="password" onChange={changeHandler} />
								<Input
									name="creation-date"
									label="Creation Date"
									disabled={true}
									initialValue={formattedDate === "Invalid Date" ? "" : formattedDate}
								/>
							</div>

							<div className="flex justify-between items-center bg-gray-50 px-10 py-6 rounded-br-lg rounded-bl-lg">
								{/* If the details are being updated, disable and display "Loading" text on button */}
								<Button disabled={userDetailsLoading}>
									{userDetailsLoading ? "Loading" : "Save"}
								</Button>
								<div className="flex flex-col justify-items-center items-stretch text-sm">
									<a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
										Delete my account
									</a>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
		</>
	);
};

export default Profile;
