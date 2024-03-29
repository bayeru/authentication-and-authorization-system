import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignupMessage from "./pages/SignupMessage";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import VerificationMessage from "./pages/VerificationPage";

function App() {

	const { authUser: user, loading, error } = useSelector((state:RootState) => state.auth);
	
	return (
		<>
			{user?.token && (
				<Routes>
					<Route path="/" element={<Home />} />					
					<Route path="/profile" element={<Profile />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			)}
			{!user?.token && (
				<Routes>
					<Route path="/signup" element={<SignUp />} />
					<Route path="/signup/message" element={<SignupMessage />} />					
					<Route path="/login" element={<SignIn />} />
					<Route path="/login/verify/:token" element={<VerificationMessage />} />
					<Route path="*" element={<Navigate to="/login" replace />} />
				</Routes>
			)}
		</>
	);
}

export default App;
