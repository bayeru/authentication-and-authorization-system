import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserProfile } from "../api/api";
import AuthContext from "../store/AuthContext";

const Home = () => {

	const context = React.useContext(AuthContext);

	useEffect(() => {

		const loadUserProfile = async () => {

			const result = await getUserProfile(context.token as string);

			console.log(result);
		};

		loadUserProfile();

	}, []);

	const logoutHandler = async () => {

		context.logout();

	}

	// getUserProfile(context.token.id, context.token.token).then((user) => {
	// 	console.log("user", user);
	// 	navigate("/", { replace: true });
	// });

	return (
		<div className="flex flex-col h-full">
			<div className="flex justify-between items-center w-full px-8 py-4 bg-white border-b shadow">
				<div>
					<img className="w-10 h-10" src="images/logo.svg" alt="" />
				</div>
				<nav className="flex space-x-7">
					<Link to="/profile">Profile</Link>
					<Link to="/" onClick={logoutHandler}>Logout</Link>
				</nav>
			</div>
			<header className="">
				<div className="mx-auto py-6 px-6 lg:px-8">
					<h1 className="font-bold text-3xl text-gray-900">Dashboard</h1>
				</div>
			</header>
			<main className="h-full mb-16">
				<div className="mx-auto px-6 lg:px-8 h-full">
					<div className="border-4 border-dashed border-gray-300 rounded-lg h-full"></div>
				</div>
			</main>
		</div>
	);
};

export default Home;
