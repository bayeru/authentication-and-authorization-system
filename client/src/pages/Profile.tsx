import React from "react";
import Button from "../components/form/Button";

const Profile = () => {
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
			<div className="grid grid-cols-3 gap-6 p-8 mt-10">
				<div className="col-span-1">
					<div className="px-4">
						<h3 className="text-lg font-medium text-gray-900">Your Profile</h3>
						<p className="mt-1 text-sm text-gray-600">
							Here you can manage your profile settings and change the password,
							email or website.
						</p>
					</div>
				</div>

				<div className="col-span-2 ">
					<form className="text-gray-500">
						<div className="bg-white shadow rounded-lg">
							<div className="px-10 py-8">
								<div className="mb-5">
									<label
										htmlFor="company-website"
										className="block text-sm font-medium text-gray-700"
									>
										Website
									</label>
									<input
										type="text"
										className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
									/>
								</div>
								<div className="mb-5">
									<label
										htmlFor="company-website"
										className="block text-sm font-medium text-gray-700"
									>
										E-mail
									</label>
									<input
										type="text"
										className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
									/>
								</div>
								<div className="mb-5">
									<label
										htmlFor="company-website"
										className="block text-sm font-medium text-gray-700"
									>
										Start Date
									</label>
									<input
										type="text"
										className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
									/>
								</div>
								<div className="mb-5">
									<label
										htmlFor="company-website"
										className="block text-sm font-medium text-gray-700"
									>
										Password
									</label>
									<input
										type="password"
										className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
									/>
								</div>
							</div>

							<div className="flex justify-between items-center bg-gray-50 px-10 py-6 rounded-br-lg rounded-bl-lg">
								<Button>Save</Button>
								<div className="flex flex-col justify-items-center items-stretch text-sm">
									<a
										href="#"
										className="font-medium text-indigo-600 hover:text-indigo-500"
									>
										Delete my account
									</a>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Profile;
