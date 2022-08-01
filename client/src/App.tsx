import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
	return (

		<Routes>

			<Route path="/" element={<Home />} />
			<Route path="/signup" element={<SignUp />} />
			<Route path="/login" element={<SignIn />} />
			<Route path="/profile" element={<Profile />} />
			<Route path="*" element={<Navigate to="/" replace />} />

		</Routes>

	);
}

export default App;
