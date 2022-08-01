import React from "react";
import Button from "../components/Button";
import Input from "../components/Input";

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
								<Input label="Website" />
								<Input label="Email" />
								<Input label="Start Date" />
								<Input label="Password" type="password" />
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
