import React from "react";

const Home = () => {
	return (
		<div className="flex flex-col h-full">
			<div className="flex justify-between items-center w-full px-8 py-4 bg-white border-b shadow">
				<div>
					<img className="w-10 h-10" src="images/logo.svg" alt="" />
				</div>
				<nav className="flex space-x-7">
					<a href="#" className="href">
						Profile
					</a>
					<a href="#" className="href">
						Logout
					</a>
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
